
import { useState } from "react";
import { Campaign } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, PauseCircle, PlayCircle, MessageSquare, Target } from "lucide-react";
import { CampaignForm } from "./CampaignForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

interface CampaignCardProps {
  campaign: Campaign;
  onUpdate: (campaign: Campaign) => void;
  onDelete: (id: string) => void;
}

export function CampaignCard({ campaign, onUpdate, onDelete }: CampaignCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleStatusToggle = () => {
    const updatedCampaign = {
      ...campaign,
      status: campaign.status === "active" ? "paused" : "active",
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedCampaign);
  };

  const handleUpdate = (updatedCampaign: Campaign) => {
    onUpdate(updatedCampaign);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete(campaign.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{campaign.name}</CardTitle>
          <Badge
            variant={campaign.status === "active" ? "default" : "secondary"}
            className="capitalize"
          >
            {campaign.status}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Created on {new Date(campaign.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{campaign.adCount} ads</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span>{campaign.commentCount} comments</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant={campaign.status === "active" ? "outline" : "default"}
            size="sm"
            onClick={handleStatusToggle}
          >
            {campaign.status === "active" ? (
              <>
                <PauseCircle className="h-4 w-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-1" />
                Activate
              </>
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update your campaign details below.
            </DialogDescription>
          </DialogHeader>
          <CampaignForm campaign={campaign} onSubmit={handleUpdate} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the campaign "{campaign.name}" and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
