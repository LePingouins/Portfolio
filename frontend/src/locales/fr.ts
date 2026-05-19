export default {
  navbar: {
    brand: "Olivier Goudreault",
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    contact: "Contact",
    work: "Expérience",
    feedback: "Avis",
    login: "Connexion",
    logout: "Déconnexion",
    language: "EN"
  },
  home: {
    title: "Portfolio",
    titleSuffix: "|",
    description: "Bienvenue sur mon site portfolio. Découvrez mes projets, compétences, expériences et plus encore.",
    timeline: {
      college: {
        title: "Début du Cégep",
        desc: "Début des études en informatique au Collège Champlain."
      },
      internship: {
        title: "Stage de Printemps Bushido",
        desc: "Site web complet pour le dojo."
      },
      graduate: {
        title: "Diplômé",
        desc: "Je terminerai mon diplôme collégial en informatique."
      },
      university: {
        title: "Université",
        desc: "Je commencerai l'université à Concordia ou Sherbrooke."
      }
    },
    testimonials: {
        loading: "Quelqu'un dit quelque chose de gentil ?..."
    }
  },
  about: {
    title: "À propos de",
    me: "Moi",
    bio: "Salut ! Je suis Olivier, un développeur passionné spécialisé dans les technologies web modernes. J'adore créer des expériences numériques propres, efficaces et belles. Mon portfolio présente une gamme de projets, des applications web full-stack aux designs frontend créatifs.",
    stats: {
      stack: "Stack",
      stackValue: "Full Stack Dev",
      hobby: "Hobby",
      hobbyValue: "Gaming",
      goal: "But",
      goalValue: "Innovation"
    },
    skillsTitle: "Compétences Techniques",
    loadingSkills: "Chargement...",
    resumeBtn: "Télécharger le CV (PDF)"
  },
  projects: {
    title: "Mes Projets",
    searchPlaceholder: "Rechercher un projet...",
    allTags: "TOUS",
    noProjects: "Aucun projet trouvé.",
    loading: "Initialisation des projets...",
    viewProject: "Voir le Projet",
    visitWebsite: "Visiter le Site"
  },
  admin: {
    projects: {
      title: "Tous les Projets",
      form: {
        projectName: "Nom du Projet",
        description: "Description (Anglais)",
        descriptionFr: "Description (Français)",
        projectLink: "Lien du Projet",
        websiteLink: "Lien du Site (optionnel)",
        imageLink: "Lien de l'Image (optionnel)",
        techStack: "Technologies (optionnel)",
        addTech: "Ajouter Tech"
      },
      actions: {
        add: "Ajouter le Projet",
        save: "Enregistrer les Modifications",
        edit: "Modifier",
        delete: "Supprimer",
        archive: "Archiver",
        unarchive: "Désarchiver"
      },
      messages: {
        addSuccess: "Projet ajouté avec succès !",
        addFail: "Échec de l'ajout du projet."
      }
    }
  },
  adminPages: {
    subnav: {
      feedbacks: "Avis",
      archive: "Archive",
      contacts: "Contacts",
      projects: "Projets",
      skills: "Compétences",
      work: "Expérience",
      aboutme: "À propos de moi",
      journey: "Parcours",
      education: "Éducation",
      resume: "CV",
      hobbies: "Hobbies"
    },
    skills: {
      title: "Gérer les Compétences",
      addPlaceholder: "Entrez une compétence",
      addButton: "Ajouter la Compétence",
      saving: "Enregistrement...",
      deleteConfirm: "Supprimer cette compétence ?",
      deleteFail: "Échec de la suppression de la compétence",
      addFail: "Échec de l'ajout de la compétence"
    },
    work: {
      title: "Gérer l'Expérience",
      addButton: "Ajouter l'Expérience",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette expérience ?",
      addFail: "Échec de l'ajout de l'expérience",
      deleteFail: "Échec de la suppression de l'expérience"
      ,company: "Entreprise",
      period: "Période",
      location: "Lieu",
      responsibilities: "Responsabilités",
      addResponsibilityPlaceholder: "Ajouter une responsabilité"
      ,language: "Langue",
      filterBy: "Filtrer par langue"
    },
    hobbies: {
      title: "Gérer les Hobbies",
      addButton: "Ajouter Hobby",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce hobby ?",
      addFail: "Échec de l'ajout du hobby",
      deleteFail: "Échec de la suppression du hobby",
      namePlaceholder: "Gaming, Photographie, etc.",
      descriptionPlaceholder: "Une brève description..."
      ,nameLabel: "Nom du Hobby",
      descriptionLabel: "Description (Optionnelle)"
    },
    education: {
      title: "Gérer la Formation",
      addButton: "Ajouter une Entrée",
      saveButton: "Enregistrer",
      cancelButton: "Annuler",
      editButton: "Modifier",
      deleteButton: "Supprimer",
      deleteConfirm: "Supprimer cette entrée de formation ?",
      deleteFail: "Échec de la suppression",
      saveFail: "Échec de l'enregistrement",
      noEntries: "Aucune entrée de formation.",
      schoolLabel: "École / Université",
      schoolPlaceholder: "Collège Champlain",
      degreeLabel: "Diplôme",
      degreePlaceholder: "DEC, Licence, etc.",
      fieldLabel: "Domaine d'études (optionnel)",
      fieldPlaceholder: "Informatique",
      startDateLabel: "Année de début",
      endDateLabel: "Année de fin",
      present: "Présent"
    },
    resume: {
      title: "Gérer le CV",
      description: "Ajoutez un lien vers votre CV (PDF hébergé sur Google Drive, Dropbox, etc.).",
      urlLabel: "URL du CV",
      urlPlaceholder: "https://drive.google.com/...",
      addButton: "Ajouter le CV",
      saveButton: "Enregistrer",
      cancelButton: "Annuler",
      editButton: "Modifier",
      deleteButton: "Supprimer",
      deleteConfirm: "Supprimer ce lien vers le CV ?",
      deleteFail: "Échec de la suppression",
      saveFail: "Échec de l'enregistrement",
      noEntries: "Aucun lien CV ajouté."
    }
  },
  adminConfirm: {
    deleteProject: "Supprimer ce projet ?"
  },
  contact: {
    title: "Restons connectés",
    subtitle: "Vous avez un projet en tête ou voulez simplement discuter ? N'hésitez pas.",
    location: "Basé à Montréal, QC",
    emailLabel: "Envoyez-moi un email",
    socialLabel: "Mes profils",
    form: {
      title: "Envoyez-moi un message",
      name: "Nom",
      email: "Adresse Email",
      subject: "Sujet",
      message: "Parlez-moi de votre projet...",
      submit: "Envoyer le message",
      submitting: "Envoi en cours...",
      successTitle: "Message Envoyé !",
      successDesc: "Merci de m'avoir contacté. Je vous répondrai dès que possible.",
      sendAnother: "Envoyer un autre message",
      errorInit: "Veuillez remplir tous les champs.",
      errorSend: "Échec de l'envoi. Veuillez réessayer.",
      cooldown: "Veuillez attendre {minutes} minute(s) avant d'envoyer un autre message."
    }
  },
  feedback: {
    header: "Le Mur des Avis",
    sub: "Ce que les gens pensent.",
    noFeedback: "Aucun avis pour le moment. Soyez le premier !",
    form: {
      title: "Laissez un Avis",
      subtitle: "Votre opinion compte !",
      name: "Votre Nom",
      rating: "Note",
      category: "Catégorie",
      comment: "Votre Commentaire",
      submit: "Envoyer l'Avis",
      submitting: "Envoi...",
      success: "Merci pour votre avis !",
      categories: {
        general: "Général",
        bug: "Signalement de Bug",
        feature: "Demande de Fonctionnalité",
        design: "Design"
      }
    }
  },
  archive: {
      title: "Messages Archivés",
      contactsTitle: "Contacts Archivés",
      feedbacksTitle: "Retours Archivés",
      projectsTitle: "Projets Archivés",
      submissionsTitle: "Soumissions de Retours",
      loading: "Chargement...",
      noProjects: "Aucun projet archivé trouvé.",
      table: {
         name: "Nom",
         email: "Email",
         message: "Message",
         date: "Date",
         description: "Description",
         techStack: "Technologies",
         links: "Liens",
         actions: "Actions",
         status: "Statut",
         comment: "Commentaire"
      },
      link: {
         project: "Projet",
         website: "Site Web"
      },
      action: {
         unarchive: "Désarchiver",
         delete: "Supprimer",
         accept: "Accepter",
         reject: "Rejeter",
         archive: "Archiver"
      },
      commentsTitle: "Commentaires :",
      noAccepted: "Aucun retour accepté pour le moment."
  },
  footer: {
      rights: "Tous droits réservés.",
      madeWith: "Fait avec"
  }
};
