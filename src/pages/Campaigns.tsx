
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { fetchCampaigns } from "@/data/mockData";
import { Campaign } from "@/lib/types";
import { Navbar } from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(64);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error loading campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaigns();

    // Listen for sidebar width changes
    const sidebarElement = document.querySelector('.sidebar');
    if (sidebarElement) {
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          setSidebarWidth(entry.contentRect.width);
        }
      });
      observer.observe(sidebarElement);
      return () => observer.disconnect();
    }
  }, []);

  const handleCreateCampaign = (campaign: Campaign) => {
    setCampaigns([campaign, ...campaigns]);
    setIsDialogOpen(false);
  };

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === updatedCampaign.id ? updatedCampaign : campaign
      )
    );
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId));
  };

  return (
    <div className="main-layout">
      <AppSidebar />
      <div 
        className="main-content"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Navbar />
        <main className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Ad Campaigns</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>
                    Create a new campaign to manage your Facebook ads and automated comments.
                  </DialogDescription>
                </DialogHeader>
                <CampaignForm onSubmit={handleCreateCampaign} />
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p>Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border rounded-lg mt-8 bg-muted/50">
              <h3 className="text-xl font-medium mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-4">Create your first campaign to get started</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Create Campaign
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onUpdate={handleUpdateCampaign}
                  onDelete={handleDeleteCampaign}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
