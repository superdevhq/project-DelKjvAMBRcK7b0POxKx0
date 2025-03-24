
import { useState } from "react";
import { Campaign } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, PauseCircle, PlayCircle, MessageSquare, Target, Calendar, MoreHorizontal } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  // Format date to be more readable
  const formattedDate = new Date(campaign.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{campaign.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleStatusToggle}>
                {campaign.status === "active" ? (
                  <>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant={campaign.status === "active" ? "default" : "secondary"}
            className="capitalize"
          >
            {campaign.status}
          </Badge>
          <CardDescription className="flex items-center text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDate}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Target className="h-4 w-4" />
              <span>Ads</span>
            </div>
            <p className="text-2xl font-bold">{campaign.adCount}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <MessageSquare className="h-4 w-4" />
              <span>Comments</span>
            </div>
            <p className="text-2xl font-bold">{campaign.commentCount}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant={campaign.status === "active" ? "outline" : "default"}
          size="sm"
          onClick={handleStatusToggle}
        >
          {campaign.status === "active" ? (
            <>
              <PauseCircle className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4 mr-2" />
              Activate
            </>
          )}
        </Button>
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
