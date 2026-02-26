package com.olivier.portfolio;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedSkills(SkillRepository skillRepo) {
        return args -> {
            List<String> skills = Arrays.asList(
                "Java", "React", "PHP", "C#", "Python", "SQL", 
                "MongoDB", "GitHub", "Linux", "IntelliJ", "Azure", 
                "Visual Studio Code", "iOS", "Android"
            );

            for (String skillName : skills) {
                if (skillRepo.findByName(skillName).isEmpty()) {
                    skillRepo.save(new Skill(skillName));
                    System.out.println("Seeded skill: " + skillName);
                }
            }
        };
    }

    @Bean
    public CommandLineRunner seedProjects(ProjectRepository projectRepo) {
        return args -> {
            // Project 1: CourtierPro
            if (projectRepo.findByName("CourtierPro").isEmpty()) {
                Project p = new Project();
                p.setName("CourtierPro");
                p.setDescription("CourtierPro is a bilingual (English/French) broker–client management and communication platform designed for Nabizada Courtier Inc., a Quebec-based real estate brokerage.");
                p.setProjectLink("https://github.com/CourtierPro/CourtierPro");
                p.setWebsiteLink("https://www.courtier-pro.ca/");
                p.setImageUrl("/CourtierPro1.png");
                p.setTechStack(Arrays.asList("React", "Spring Boot", "Github"));
                p.setArchived(false);
                if (p.getImageUrl() == null || p.getImageUrl().trim().isEmpty()) {
                    p.setImageUrl("/project-placeholder.png");
                }
                projectRepo.save(p);
                System.out.println("Seeded project: CourtierPro");
            }

            // Project 2: Entretien Batiment
            if (projectRepo.findByName("Entretien Batiment").isEmpty()) {
                Project p = new Project();
                p.setName("Entretien Batiment");
                p.setDescription("A Todo Application, which includes work orders, kilometers, archives.");
                p.setProjectLink("https://github.com/LePingouins/entretien-batiment");
                p.setWebsiteLink(null);
                p.setImageUrl("/EntretientBatiment1.png");
                p.setTechStack(Arrays.asList("React", "Spring Boot", "PostgreSQL"));
                p.setArchived(false);
                if (p.getImageUrl() == null || p.getImageUrl().trim().isEmpty()) {
                    p.setImageUrl("/project-placeholder.png");
                }
                projectRepo.save(p);
                System.out.println("Seeded project: Entretien Batiment");
            }

            // Project 3: Champlain PetClinic
            if (projectRepo.findByName("Champlain PetClinic").isEmpty()) {
                Project p = new Project();
                p.setName("Champlain PetClinic");
                p.setDescription("This repository is being used by Champlain College - St. Lambert Computer Science students who are extending the Spring Boot Microservices Petclinic. This is a multi-section, multi-year project that teaches students about Scrum, version control, issue management, TDD, CI, and so much more.");
                p.setProjectLink("https://github.com/cgerard321/champlain_petclinic");
                p.setWebsiteLink("https://petclinic.benmusicgeek.synology.me/home");
                p.setImageUrl("/ChamplainPetClinic.png"); 
                p.setTechStack(Arrays.asList("React", "Spring Boot", "JavaScript", "TypeScript"));
                p.setArchived(false);
                if (p.getImageUrl() == null || p.getImageUrl().trim().isEmpty()) {
                    p.setImageUrl("/project-placeholder.png");
                }
                System.out.println("Seeded project: Champlain PetClinic");
                projectRepo.save(p);
            }
        };
    }

    @Bean
    public CommandLineRunner seedWorkExperience(WorkExperienceRepository workRepo) {
        return args -> {
            if (workRepo.count() == 0) {
                // English entries
                WorkExperience en1 = new WorkExperience();
                en1.setLanguage("en");
                en1.setTitle("Data Entry Clerk / Office Assistant");
                en1.setCompany("Horizon Nature");
                en1.setPeriod("2021 - 2023");
                en1.setLocation("Saint-Léonard, Montréal, QC");
                en1.setResponsibilities(Arrays.asList(
                    "Entered and verified high-volume data with precision and confidentiality.",
                    "Supported daily operations and coordinated document management."
                ));
                workRepo.save(en1);

                WorkExperience en2 = new WorkExperience();
                en2.setLanguage("en");
                en2.setTitle("Handler");
                en2.setCompany("Horizon Nature");
                en2.setPeriod("2019 - 2021");
                en2.setLocation("Saint-Léonard, Montréal, QC");
                en2.setResponsibilities(Arrays.asList(
                    "Movement, organization, and preparation of materials in a dynamic environment.",
                    "Maintained accuracy and teamwork in daily tasks.",
                    "Developed reliability and time management skills."
                ));
                workRepo.save(en2);

                // French entries (translated)
                WorkExperience fr1 = new WorkExperience();
                fr1.setLanguage("fr");
                fr1.setTitle("Clerc de saisie / Assistant de bureau");
                fr1.setCompany("Horizon Nature");
                fr1.setPeriod("2021 - 2023");
                fr1.setLocation("Saint-Léonard, Montréal, QC");
                fr1.setResponsibilities(Arrays.asList(
                    "Saisie et vérification de grandes quantités de données avec précision et confidentialité.",
                    "Soutien aux opérations quotidiennes et coordination de la gestion documentaire."
                ));
                workRepo.save(fr1);

                WorkExperience fr2 = new WorkExperience();
                fr2.setLanguage("fr");
                fr2.setTitle("Manutentionnaire");
                fr2.setCompany("Horizon Nature");
                fr2.setPeriod("2019 - 2021");
                fr2.setLocation("Saint-Léonard, Montréal, QC");
                fr2.setResponsibilities(Arrays.asList(
                    "Mouvement, organisation et préparation des matériaux dans un environnement dynamique.",
                    "Maintien de la précision et du travail d'équipe dans les tâches quotidiennes.",
                    "Développement de la fiabilité et des compétences en gestion du temps."
                ));
                workRepo.save(fr2);

                System.out.println("Seeded bilingual work experiences");
            }
        };
    }

    @Bean
    public CommandLineRunner seedJourney(JourneyRepository journeyRepo) {
        return args -> {
            if (journeyRepo.count() == 0) {
                // English
                Journey en1 = new Journey();
                en1.setLanguage("en");
                en1.setTitle("University");
                en1.setDate("2026");
                en1.setDescription("Will start university at Concordia or Sherbrooke.");
                en1.setDisplayOrder(1);
                journeyRepo.save(en1);

                Journey en2 = new Journey();
                en2.setLanguage("en");
                en2.setTitle("Graduate");
                en2.setDate("2026");
                en2.setDescription("Will complete my college degree in Computer Science.");
                en2.setDisplayOrder(2);
                journeyRepo.save(en2);

                Journey en3 = new Journey();
                en3.setLanguage("en");
                en3.setTitle("Bushido Spring Internship");
                en3.setDate("2026");
                en3.setDescription("Dojo website full-stack.");
                en3.setDisplayOrder(3);
                journeyRepo.save(en3);

                Journey en4 = new Journey();
                en4.setLanguage("en");
                en4.setTitle("Started College");
                en4.setDate("2023");
                en4.setDescription("Began Computer Science Technology studies at Champlain College.");
                en4.setDisplayOrder(4);
                journeyRepo.save(en4);

                // French
                Journey fr1 = new Journey();
                fr1.setLanguage("fr");
                fr1.setTitle("Université");
                fr1.setDate("2026");
                fr1.setDescription("Je commencerai l'université à Concordia ou Sherbrooke.");
                fr1.setDisplayOrder(1);
                journeyRepo.save(fr1);

                Journey fr2 = new Journey();
                fr2.setLanguage("fr");
                fr2.setTitle("Diplômé");
                fr2.setDate("2026");
                fr2.setDescription("Je terminerai mon diplôme collégial en informatique.");
                fr2.setDisplayOrder(2);
                journeyRepo.save(fr2);

                Journey fr3 = new Journey();
                fr3.setLanguage("fr");
                fr3.setTitle("Stage de Printemps Bushido");
                fr3.setDate("2026");
                fr3.setDescription("Site web complet pour le dojo.");
                fr3.setDisplayOrder(3);
                journeyRepo.save(fr3);

                Journey fr4 = new Journey();
                fr4.setLanguage("fr");
                fr4.setTitle("Début du Cégep");
                fr4.setDate("2023");
                fr4.setDescription("Début des études en informatique au Collège Champlain.");
                fr4.setDisplayOrder(4);
                journeyRepo.save(fr4);

                System.out.println("Seeded Journey content");
            }
        };
    }

    @Bean
    public CommandLineRunner seedAboutMe(AboutMeRepository aboutMeRepo) {
        return args -> {
            if (aboutMeRepo.count() == 0) {
                AboutMe en = new AboutMe();
                en.setLanguage("en");
                en.setText("I am a passionate software developer with a strong foundation in full-stack development.");
                en.setStack(Arrays.asList("Java", "React", "Spring Boot"));
                en.setHobbies(Arrays.asList("Gaming", "Reading"));
                en.setGoals(Arrays.asList("Learn more about AI", "Contribute to open source"));
                aboutMeRepo.save(en);

                AboutMe fr = new AboutMe();
                fr.setLanguage("fr");
                fr.setText("Je suis un développeur logiciel passionné avec une solide base en développement full-stack.");
                fr.setStack(Arrays.asList("Java", "React", "Spring Boot"));
                fr.setHobbies(Arrays.asList("Jeux vidéo", "Lecture"));
                fr.setGoals(Arrays.asList("En apprendre plus sur l'IA", "Contribuer à l'open source"));
                aboutMeRepo.save(fr);

                System.out.println("Seeded About Me content");
            }
        };
    }

    @Bean
    public CommandLineRunner seedHobbies(HobbyRepository hobbyRepo) {
        return args -> {
            if (hobbyRepo.count() == 0) {
                Hobby gaming = new Hobby();
                gaming.setName("Gaming");
                hobbyRepo.save(gaming);
                System.out.println("Seeded hobby: Gaming");
            }
        };
    }
}
