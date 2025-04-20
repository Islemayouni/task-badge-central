
import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface CreateProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: (project: any) => void;
}

const categories = ["Développement", "Ressources Humaines", "Finance", "Marketing"];
const types = ["Application", "Web", "Backend", "Mobile"];

export function CreateProjectForm({ open, onOpenChange, onProjectCreated }: CreateProjectFormProps) {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      nom: "",
      cleProjet: "",
      description: "",
      categorie: "",
      typeProjet: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const newProject = {
        id: `P${Math.floor(Math.random() * 1000)}`,
        ...data,
        etat: "actif",
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
        versionLogiciel: "1.0.0",
        tags: [],
        configWorkflow: {
          etapes: [],
          transitions: []
        },
        droitAcces: [],
        archive: false,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
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

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">Créer le projet</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
