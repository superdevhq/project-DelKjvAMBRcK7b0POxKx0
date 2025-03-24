
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAISettings } from "@/data/mockData";
import { AISettings } from "@/lib/types";
import { Navbar } from "@/components/layout/Navbar";
import { AppSidebar, SidebarToggle } from "@/components/layout/AppSidebar";
import { SidebarOverlay } from "@/components/ui/sidebar";
import { Loader2, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [blacklistedWords, setBlacklistedWords] = useState("");
  const [responseTemplates, setResponseTemplates] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchAISettings();
        setSettings(data);
        setBlacklistedWords(data.blacklistedWords.join(", "));
        setResponseTemplates(data.responseTemplates.join("\n"));
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSaveSettings = () => {
    if (!settings) return;

    setIsSaving(true);

    // Process blacklisted words and response templates
    const processedBlacklistedWords = blacklistedWords
      .split(",")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    const processedResponseTemplates = responseTemplates
      .split("\n")
      .map((template) => template.trim())
      .filter((template) => template.length > 0);

    const updatedSettings: AISettings = {
      ...settings,
      blacklistedWords: processedBlacklistedWords,
      responseTemplates: processedResponseTemplates,
    };

    // Simulate API call
    setTimeout(() => {
      setSettings(updatedSettings);
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your AI settings have been updated successfully.",
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <>
        <AppSidebar />
        <SidebarOverlay />
        <div className="flex min-h-screen flex-col lg:pl-[280px]">
          <SidebarToggle />
          <Navbar />
          <main className="flex-1 p-6 md:p-8 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <p>Loading settings...</p>
          </main>
        </div>
      </>
    );
  }

  if (!settings) {
    return (
      <>
        <AppSidebar />
        <SidebarOverlay />
        <div className="flex min-h-screen flex-col lg:pl-[280px]">
          <SidebarToggle />
          <Navbar />
          <main className="flex-1 p-6 md:p-8">
            <div className="flex flex-col items-center justify-center h-64 border rounded-lg mt-4 bg-muted/50">
              <h3 className="text-xl font-medium mb-2">Error loading settings</h3>
              <p className="text-muted-foreground mb-4">Please try again later</p>
              <Button onClick={() => window.location.reload()}>Reload</Button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <AppSidebar />
      <SidebarOverlay />
      <div className="flex min-h-screen flex-col lg:pl-[280px]">
        <SidebarToggle />
        <Navbar />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          </div>

          <Tabs defaultValue="ai" className="space-y-6">
            <TabsList>
              <TabsTrigger value="ai">AI Configuration</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="ai" className="space-y-6">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>AI Response Settings</CardTitle>
                  <CardDescription>
                    Configure how the AI generates responses to comments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Response Tone</Label>
                    <Select
                      value={settings.tone}
                      onValueChange={(value: "professional" | "friendly" | "enthusiastic" | "helpful") => 
                        setSettings({ ...settings, tone: value })
                      }
                    >
                      <SelectTrigger id="tone">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="helpful">Helpful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLength">Maximum Response Length</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="maxLength"
                        type="number"
                        min={50}
                        max={500}
                        value={settings.maxLength}
                        onChange={(e) => 
                          setSettings({ ...settings, maxLength: parseInt(e.target.value) || 200 })
                        }
                      />
                      <span className="text-sm text-muted-foreground">characters</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeEmojis"
                      checked={settings.includeEmojis}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, includeEmojis: checked })
                      }
                    />
                    <Label htmlFor="includeEmojis">Include emojis in responses</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customPrompt">Custom AI Prompt</Label>
                    <Textarea
                      id="customPrompt"
                      placeholder="Enter custom instructions for the AI"
                      value={settings.customPrompt || ""}
                      onChange={(e) => 
                        setSettings({ ...settings, customPrompt: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      This prompt will guide the AI on how to respond to comments.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blacklistedWords">Blacklisted Words</Label>
                    <Textarea
                      id="blacklistedWords"
                      placeholder="Enter words separated by commas"
                      value={blacklistedWords}
                      onChange={(e) => setBlacklistedWords(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Comments containing these words will be flagged for manual review.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responseTemplates">Response Templates</Label>
                    <Textarea
                      id="responseTemplates"
                      placeholder="Enter response templates, one per line"
                      value={responseTemplates}
                      onChange={(e) => setResponseTemplates(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      The AI will use these templates as starting points for responses.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveSettings} 
                    disabled={isSaving}
                    className="ml-auto"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="h-full flex-col border-none p-10 data-[state=active]:flex">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Account settings coming soon</p>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="h-full flex-col border-none p-10 data-[state=active]:flex">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Notification settings coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
