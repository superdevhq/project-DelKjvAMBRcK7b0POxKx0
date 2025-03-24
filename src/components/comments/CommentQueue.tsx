
import { Comment } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Zap, AlertCircle, Loader2 } from "lucide-react";

interface CommentQueueProps {
  comments: Comment[];
  isLoading: boolean;
  onGenerateReply: (commentId: string) => void;
}

export function CommentQueue({ comments, isLoading, onGenerateReply }: CommentQueueProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p>Loading comments...</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg mt-4 bg-muted/50">
        <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No pending comments</h3>
        <p className="text-muted-foreground">All comments have been replied to</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium">{comment.author}</CardTitle>
              <div className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>
            <CardDescription className="text-xs">
              Ad: {comment.adId.replace('ad-', 'Advertisement ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm">{comment.content}</p>
          </CardContent>
          <CardFooter className="pt-3 border-t">
            {comment.replyStatus === 'pending' ? (
              <Button disabled className="w-full">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Reply...
              </Button>
            ) : comment.replyStatus === 'failed' ? (
              <Button 
                variant="outline" 
                className="w-full text-destructive" 
                onClick={() => onGenerateReply(comment.id)}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Retry
              </Button>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => onGenerateReply(comment.id)}
              >
                <Zap className="h-4 w-4 mr-2" />
                Generate AI Reply
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
