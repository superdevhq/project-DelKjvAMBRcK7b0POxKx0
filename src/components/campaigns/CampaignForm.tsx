
import { useState } from "react";
import { Campaign } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currentUser } from "@/data/mockData";

interface CampaignFormProps {
  campaign?: Campaign;
  onSubmit: (campaign: Campaign) => void;
}

export function CampaignForm({ campaign, onSubmit }: CampaignFormProps) {
  const [name, setName] = useState(campaign?.name || "");
  const [status, setStatus] = useState<"active" | "paused">(
    campaign?.status || "active"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date().toISOString();
    const updatedCampaign: Campaign = {
      id: campaign?.id || `campaign-${Date.now()}`,
      name,
      status,
      createdAt: campaign?.createdAt || now,
      updatedAt: now,
      adCount: campaign?.adCount || 0,
      commentCount: campaign?.commentCount || 0,
      userId: currentUser.id,
    };

    // Simulate API delay
    setTimeout(() => {
      onSubmit(updatedCampaign);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter campaign name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(value: "active" | "paused") => setStatus(value)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : campaign
          ? "Update Campaign"
          : "Create Campaign"}
      </Button>
    </form>
  );
}
