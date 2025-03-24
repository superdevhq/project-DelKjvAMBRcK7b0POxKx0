
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, MessageSquare, Target, Zap } from "lucide-react";
import { fetchCampaigns, fetchPendingComments } from "@/data/mockData";
import { Campaign, Comment } from "@/lib/types";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const campaignsData = await fetchCampaigns();
        const pendingCommentsData = await fetchPendingComments();
        
        setCampaigns(campaignsData);
        setPendingComments(pendingCommentsData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate stats
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalAds = campaigns.reduce((sum, campaign) => sum + campaign.adCount, 0);
  const totalComments = campaigns.reduce((sum, campaign) => sum + campaign.commentCount, 0);
  const pendingCount = pendingComments.length;

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Campaigns
                    </CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCampaigns}</div>
                    <p className="text-xs text-muted-foreground">
                      {activeCampaigns} active campaigns
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Ads
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalAds}</div>
                    <p className="text-xs text-muted-foreground">
                      Across all campaigns
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Comments
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalComments}</div>
                    <p className="text-xs text-muted-foreground">
                      {pendingCount} pending replies
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      AI Response Rate
                    </CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalComments ? Math.round(((totalComments - pendingCount) / totalComments) * 100) : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last 30 days
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Recent comments and AI responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center h-40">
                        <p>Loading recent activity...</p>
                      </div>
                    ) : pendingComments.length === 0 ? (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-muted-foreground">No recent activity to display</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pendingComments.map(comment => (
                          <div key={comment.id} className="border rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <MessageSquare className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {comment.author}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {comment.content}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(comment.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <div className="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500">
                                Pending
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Active Campaigns</CardTitle>
                    <CardDescription>
                      Your currently running campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center h-40">
                        <p>Loading campaigns...</p>
                      </div>
                    ) : campaigns.length === 0 ? (
                      <div className="flex items-center justify-center h-40">
                        <p className="text-muted-foreground">No active campaigns</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {campaigns
                          .filter(campaign => campaign.status === 'active')
                          .map(campaign => (
                            <div key={campaign.id} className="flex items-center">
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {campaign.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {campaign.adCount} ads · {campaign.commentCount} comments
                                </p>
                              </div>
                              <div className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                                Active
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="h-full flex-col border-none p-10 data-[state=active]:flex">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Analytics dashboard coming soon</p>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="h-full flex-col border-none p-10 data-[state=active]:flex">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Reports dashboard coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
