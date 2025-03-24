
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchComments, fetchPendingComments, generateAIReply } from "@/data/mockData";
import { Comment } from "@/lib/types";
import { Navbar } from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { CommentQueue } from "@/components/comments/CommentQueue";
import { CommentHistory } from "@/components/comments/CommentHistory";

export default function Comments() {
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [repliedComments, setRepliedComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const allComments = await fetchComments();
        const pendingCommentsData = await fetchPendingComments();
        
        setPendingComments(pendingCommentsData);
        setRepliedComments(allComments.filter(comment => comment.replied));
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, []);

  const handleGenerateReply = async (commentId: string) => {
    const comment = pendingComments.find(c => c.id === commentId);
    if (!comment) return;

    // Update UI to show loading state
    setPendingComments(
      pendingComments.map(c => 
        c.id === commentId ? { ...c, replyStatus: 'pending' } : c
      )
    );

    try {
      // Generate AI reply
      const aiReply = await generateAIReply(comment.content);
      
      // Update the comment with the generated reply
      const updatedComment: Comment = {
        ...comment,
        replied: true,
        replyContent: aiReply,
        replyStatus: 'sent',
        replyCreatedAt: new Date().toISOString()
      };

      // Update state
      setPendingComments(pendingComments.filter(c => c.id !== commentId));
      setRepliedComments([updatedComment, ...repliedComments]);
    } catch (error) {
      console.error("Error generating reply:", error);
      
      // Update UI to show error state
      setPendingComments(
        pendingComments.map(c => 
          c.id === commentId ? { ...c, replyStatus: 'failed' } : c
        )
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1">
        <Navbar />
        <main className="flex-1 p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-8">Comments</h1>
          
          <Tabs defaultValue="queue" className="w-full">
            <TabsList className="settings-tabs mb-6">
              <TabsTrigger value="queue" className="settings-tab">
                Queue
                {pendingComments.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {pendingComments.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="history" className="settings-tab">History</TabsTrigger>
            </TabsList>
            <TabsContent value="queue">
              <CommentQueue 
                comments={pendingComments}
                isLoading={isLoading}
                onGenerateReply={handleGenerateReply}
              />
            </TabsContent>
            <TabsContent value="history">
              <CommentHistory 
                comments={repliedComments}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
