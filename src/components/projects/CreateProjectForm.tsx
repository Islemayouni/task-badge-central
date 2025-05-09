
import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface CreateProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: (project: any) => void;
}

const categories = ["Développement", "Ressources Humaines", "Finance", "Marketing"];
const types = ["Application", "Web", "Backend", "Mobile"];
const etats = ["actif", "en_pause", "terminé", "annulé"];

export function CreateProjectForm({ open, onOpenChange, onProjectCreated }: CreateProjectFormProps) {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      nom: "",
      cleProjet: "",
      description: "",
      categorie: "",
      typeProjet: "",
      etat: "actif",
      versionLogiciel: "1.0.0",
      archive: false,
      tags: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const newProject = {
        id: `P${Math.floor(Math.random() * 1000)}`,
        ...data,
        tags: data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== ''),
        dateCreation: new Date().toISOString(),
        dateDerniereModif: new Date().toISOString(),
        iconeUrl: "/lovable-uploads/20c9b8cf-e6ff-41dc-af0d-d2f48cacd49e.png",
        utilisateursAssocies: [],
        tasks: [],
        chefDeProjet: {
          id: "U001",
          nom: "Durand",
          prenom: "Thomas",
          email: "thomas.durand@entreprise.com",
          role: "Chef de projet"
        },
        personneAssigneeParDefaut: null,
        roles: [],
        configWorkflow: {
          etapes: [],
          transitions: []
        },
        droitAcces: [],
        urlProjet: `/projects/${data.cleProjet}`
      };

      onProjectCreated(newProject);
      onOpenChange(false);
      form.reset();

      toast({
        title: "Projet créé",
        description: "Le projet a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du projet.",
        variant: "destructive",
      });
    }
  };

  // Utilisation d'un Dialog pour des écrans plus larges et d'un Sheet pour les mobiles
  return (
    <>
      {/* Dialog pour écrans larges */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un nouveau projet</DialogTitle>
            <DialogDescription>
              Remplissez les informations du projet. Vous pourrez ajouter des membres et des tâches plus tard.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nom"
                rules={{ required: "Le nom du projet est requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du projet</FormLabel>
                    <FormControl>
                      <Input placeholder="Mon nouveau projet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cleProjet"
                rules={{ required: "La clé du projet est requise" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clé du projet</FormLabel>
                    <FormControl>
                      <Input placeholder="PRJ-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description du projet..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categorie"
                  rules={{ required: "La catégorie est requise" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="typeProjet"
                  rules={{ required: "Le type de projet est requis" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de projet</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="etat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>État du projet</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un état" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {etats.map((etat) => (
                          <SelectItem key={etat} value={etat}>
                            {etat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="versionLogiciel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version du logiciel</FormLabel>
                    <FormControl>
                      <Input placeholder="1.0.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (séparés par des virgules)</FormLabel>
                    <FormControl>
                      <Input placeholder="React, API, Mobile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="archive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0 rounded-md border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Archiver</FormLabel>
                      <FormDescription>
                        Archiver ce projet dès sa création
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit">Créer le projet</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
