import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Trash2, LogOut, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  project_url?: string;
  technologies?: string[];
  created_at: string;
}

interface Feedback {
  id: string;
  client_name: string;
  feedback: string;
  rating: number;
  project_title?: string;
  client_image_url?: string;
  client_email?: string;
  created_at: string;
}

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { toast } = useToast();

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    project_url: '',
    technologies: ''
  });
  
  const [feedbackForm, setFeedbackForm] = useState({
    client_name: '',
    feedback: '',
    rating: 5,
    project_title: '',
    client_image_url: '',
    client_email: ''
  });

  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingFeedback, setEditingFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      setCheckingAuth(false);
      return;
    }

    checkAuthorization();
  }, [user, loading]);

  useEffect(() => {
    if (isAuthorized) {
      fetchProjects();
      fetchFeedbacks();
    }
  }, [isAuthorized]);

  const checkAuthorization = async () => {
    if (!user) {
      setCheckingAuth(false);
      return;
    }

    const authorizedEmails = ['tvsathwiktvsathwiksai@gmail.com', 'ansavali3231@gmail.com'];
    const isAuth = authorizedEmails.includes(user.email || '');
    setIsAuthorized(isAuth);
    setCheckingAuth(false);

    if (!isAuth) {
      toast({
        title: 'Access Denied',
        description: 'You are not authorized to access the admin panel.',
        variant: 'destructive',
      });
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive',
      });
    } else {
      setProjects(data || []);
    }
  };

  const fetchFeedbacks = async () => {
    const { data, error } = await supabase
      .from('client_feedbacks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch feedbacks',
        variant: 'destructive',
      });
    } else {
      setFeedbacks(data || []);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject);

        if (error) throw error;
        toast({ title: 'Project updated successfully!' });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
        toast({ title: 'Project created successfully!' });
      }

      setProjectForm({
        title: '',
        description: '',
        category: '',
        image_url: '',
        project_url: '',
        technologies: ''
      });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingFeedback) {
        const { error } = await supabase
          .from('client_feedbacks')
          .update(feedbackForm)
          .eq('id', editingFeedback);

        if (error) throw error;
        toast({ title: 'Feedback updated successfully!' });
      } else {
        const { error } = await supabase
          .from('client_feedbacks')
          .insert([feedbackForm]);

        if (error) throw error;
        toast({ title: 'Feedback created successfully!' });
      }

      setFeedbackForm({
        client_name: '',
        feedback: '',
        rating: 5,
        project_title: '',
        client_image_url: '',
        client_email: ''
      });
      setEditingFeedback(null);
      fetchFeedbacks();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save feedback',
        variant: 'destructive',
      });
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Project deleted successfully!' });
      fetchProjects();
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    const { error } = await supabase
      .from('client_feedbacks')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete feedback',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Feedback deleted successfully!' });
      fetchFeedbacks();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Signed out successfully!' });
  };

  if (loading || checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Admin <span className="text-primary">Panel</span>
          </h1>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="mr-2" size={16} />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="feedback">Client Feedback</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            {/* Project Form */}
            <div className="project-card bg-card p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={projectForm.image_url}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, image_url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="project_url">Project URL</Label>
                    <Input
                      id="project_url"
                      type="url"
                      value={projectForm.project_url}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, project_url: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                    placeholder="React, TypeScript, Tailwind CSS"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="btn-gradient">
                    <Plus className="mr-2" size={16} />
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </Button>
                  {editingProject && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingProject(null);
                        setProjectForm({
                          title: '',
                          description: '',
                          category: '',
                          image_url: '',
                          project_url: '',
                          technologies: ''
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Existing Projects ({projects.length})</h3>
              {projects.map((project) => (
                <div key={project.id} className="project-card bg-card p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                    <p className="text-sm line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProject(project.id);
                        setProjectForm({
                          title: project.title,
                          description: project.description,
                          category: project.category,
                          image_url: project.image_url || '',
                          project_url: project.project_url || '',
                          technologies: project.technologies?.join(', ') || ''
                        });
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteProject(project.id)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-8">
            {/* Feedback Form */}
            <div className="project-card bg-card p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingFeedback ? 'Edit Feedback' : 'Add New Feedback'}
              </h2>
              
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client_name">Client Name *</Label>
                    <Input
                      id="client_name"
                      value={feedbackForm.client_name}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, client_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating *</Label>
                    <Select
                      value={feedbackForm.rating.toString()}
                      onValueChange={(value) => setFeedbackForm(prev => ({ ...prev, rating: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="feedback">Feedback *</Label>
                  <Textarea
                    id="feedback"
                    value={feedbackForm.feedback}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project_title">Project Title</Label>
                    <Input
                      id="project_title"
                      value={feedbackForm.project_title}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, project_title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="client_email">Client Email</Label>
                    <Input
                      id="client_email"
                      type="email"
                      value={feedbackForm.client_email}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, client_email: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="client_image_url">Client Image URL</Label>
                  <Input
                    id="client_image_url"
                    type="url"
                    value={feedbackForm.client_image_url}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, client_image_url: e.target.value }))}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" className="btn-gradient">
                    <Plus className="mr-2" size={16} />
                    {editingFeedback ? 'Update Feedback' : 'Add Feedback'}
                  </Button>
                  {editingFeedback && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingFeedback(null);
                        setFeedbackForm({
                          client_name: '',
                          feedback: '',
                          rating: 5,
                          project_title: '',
                          client_image_url: '',
                          client_email: ''
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Existing Feedback ({feedbacks.length})</h3>
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="project-card bg-card p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{feedback.client_name}</h4>
                      <div className="flex">
                        {Array.from({ length: feedback.rating }, (_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    {feedback.project_title && (
                      <p className="text-sm text-primary mb-1">Project: {feedback.project_title}</p>
                    )}
                    <p className="text-sm line-clamp-2">{feedback.feedback}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingFeedback(feedback.id);
                        setFeedbackForm({
                          client_name: feedback.client_name,
                          feedback: feedback.feedback,
                          rating: feedback.rating,
                          project_title: feedback.project_title || '',
                          client_image_url: feedback.client_image_url || '',
                          client_email: feedback.client_email || ''
                        });
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteFeedback(feedback.id)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;