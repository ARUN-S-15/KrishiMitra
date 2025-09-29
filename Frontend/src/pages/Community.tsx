import { useState } from "react";
import { Heart, MessageCircle, Share2, Plus, Camera, Image, Mic } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Post {
  id: string;
  author: string;
  avatar: string;
  location: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  liked: boolean;
  category: string;
}

const Community = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const [posts] = useState<Post[]>([
    {
      id: "1",
      author: "Ravi Kumar",
      avatar: "",
      location: "Thrissur, Kerala",
      time: "2 hours ago",
      content: "Just harvested my first batch of organic tomatoes! 🍅 The yield is better than expected. Used completely natural fertilizers this season. Anyone interested in buying organic produce?",
      image: "",
      likes: 24,
      comments: 8,
      liked: false,
      category: "Harvest Update"
    },
    {
      id: "2",
      author: "Meera Nair",
      avatar: "",
      location: "Kottayam, Kerala",
      time: "4 hours ago",
      content: "Need advice on pest control for pepper plants. Noticed some white spots on leaves. Has anyone faced similar issues? Looking for organic solutions.",
      likes: 12,
      comments: 15,
      liked: true,
      category: "Help Needed"
    },
    {
      id: "3",
      author: "Suresh Pillai",
      avatar: "",
      location: "Alappuzha, Kerala",
      time: "6 hours ago",
      content: "Monsoon season is here! Time to prepare the fields for rice cultivation. Sharing some traditional techniques my grandfather taught me for better water management during heavy rains.",
      likes: 31,
      comments: 12,
      liked: false,
      category: "Tips & Tricks"
    },
    {
      id: "4",
      author: "Priya Menon",
      avatar: "",
      location: "Kozhikode, Kerala",
      time: "1 day ago",
      content: "Successfully implemented drip irrigation in my vegetable garden. Water consumption reduced by 40%! Investment paid off within 6 months. Happy to share details with anyone interested.",
      likes: 45,
      comments: 20,
      liked: true,
      category: "Success Story"
    }
  ]);

  const handleLike = (postId: string) => {
    // Toggle like functionality would be implemented here
    console.log(`Liked post ${postId}`);
  };

  const handleComment = (postId: string) => {
    // Navigate to comments or expand comments
    console.log(`Comment on post ${postId}`);
  };

  const handleShare = (postId: string) => {
    // Share functionality
    console.log(`Share post ${postId}`);
  };

  const handleSubmitPost = () => {
    if (newPostContent.trim()) {
      // Submit new post logic would be here
      console.log("New post:", newPostContent);
      setNewPostContent("");
      setShowNewPost(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Farmer Community</h1>
        <p className="text-muted-foreground">Connect, share, and learn from fellow farmers</p>
      </div>

      {/* New Post Button */}
      <Card className="mb-6 bg-card-gradient shadow-card">
        <CardContent className="p-4">
          {!showNewPost ? (
            <Button 
              onClick={() => setShowNewPost(true)}
              className="w-full justify-start gap-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
              variant="ghost"
            >
              <Plus className="h-5 w-5" />
              Share your farming experience...
            </Button>
          ) : (
            <div className="space-y-4">
              <Textarea
                placeholder="What's happening in your farm today?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4 mr-2" />
                    Gallery
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowNewPost(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitPost}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="bg-card-gradient shadow-card hover:shadow-float transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-primary">{post.author}</h3>
                    <p className="text-sm text-muted-foreground">{post.location}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-card-foreground leading-relaxed mb-4">
                {post.content}
              </p>
              
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`gap-2 ${post.liked ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleComment(post.id)}
                  className="gap-2 text-muted-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  {post.comments}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(post.id)}
                  className="gap-2 text-muted-foreground"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default Community;