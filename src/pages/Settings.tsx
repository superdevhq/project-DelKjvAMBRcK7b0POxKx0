
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  const [responseStyle, setResponseStyle] = useState("friendly");
  const [responseLength, setResponseLength] = useState(75);
  const [promptTemplate, setPromptTemplate] = useState(
    "You are a helpful customer service representative responding to a customer comment on a Facebook ad. Your response should be helpful, concise, and friendly."
  );
  const [prohibitedWords, setProhibitedWords] = useState("swear, curse, offensive");
  const [sidebarWidth, setSidebarWidth] = useState(64);

  useEffect(() => {
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

  return (
    <div className="main-layout">
      <AppSidebar />
      <div 
        className="main-content"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Navbar />
        <main className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Configure how your AI assistant responds to comments.
          </p>

          <Tabs defaultValue="ai-behavior" className="w-full">
            <TabsList className="settings-tabs mb-8">
              <TabsTrigger value="ai-behavior" className="settings-tab">
                AI Behavior
              </TabsTrigger>
              <TabsTrigger value="limits" className="settings-tab">
                Limits
              </TabsTrigger>
              <TabsTrigger value="notifications" className="settings-tab">
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-behavior" className="space-y-6">
              <Card className="settings-card">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">AI Response Settings</h2>
                    <p className="text-muted-foreground">
                      Configure how the AI responds to comments on your ads.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="response-style">Response Style</Label>
                      <Select value={responseStyle} onValueChange={setResponseStyle}>
                        <SelectTrigger id="response-style" className="w-full">
                          <SelectValue placeholder="Select a response style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                          <SelectItem value="professional">Professional & Formal</SelectItem>
                          <SelectItem value="casual">Casual & Conversational</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic & Energetic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="response-length">Response Length</Label>
                        <span className="text-sm font-medium">{responseLength}%</span>
                      </div>
                      <Slider
                        id="response-length"
                        min={0}
                        max={100}
                        step={1}
                        value={[responseLength]}
                        onValueChange={(value) => setResponseLength(value[0])}
                        className="settings-slider"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-muted-foreground">Shorter</span>
                        <span className="text-sm text-muted-foreground">Longer</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prompt-template">AI Prompt Template</Label>
                      <Textarea
                        id="prompt-template"
                        value={promptTemplate}
                        onChange={(e) => setPromptTemplate(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                      <p className="text-sm text-muted-foreground">
                        This prompt guides the AI on how to respond to comments.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prohibited-words">Prohibited Words/Phrases</Label>
                      <Textarea
                        id="prohibited-words"
                        value={prohibitedWords}
                        onChange={(e) => setProhibitedWords(e.target.value)}
                        className="resize-none"
                        placeholder="Enter words or phrases separated by commas"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="limits" className="space-y-6">
              <Card className="settings-card">
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Limits settings coming soon</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="settings-card">
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Notification settings coming soon</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
