
import { Comment } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Loader2 } from "lucide-react";

interface CommentHistoryProps {
  comments: Comment[];
  isLoading: boolean;
}

export function CommentHistory({ comments, isLoading }: CommentHistoryProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p>Loading comment history...</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg mt-4 bg-muted/50">
        <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No comment history</h3>
        <p className="text-muted-foreground">Generate replies to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium">{comment.author}</CardTitle>
              <Badge variant="outline" className="capitalize">
                {new Date(comment.createdAt).toLocaleDateString()}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Ad: {comment.adId.replace('ad-', 'Advertisement ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-muted">User Comment</Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm pl-4 border-l-2 border-muted">{comment.content}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">AI Reply</Badge>
                <span className="text-xs text-muted-foreground">
                  {comment.replyCreatedAt ? new Date(comment.replyCreatedAt).toLocaleTimeString() : 'N/A'}
                </span>
              </div>
              <p className="text-sm pl-4 border-l-2 border-primary">{comment.replyContent}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
