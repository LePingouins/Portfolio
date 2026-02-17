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
                p.setImageUrl("https://image2url.com/r2/default/images/1771291691594-53cc4fef-f5b8-4199-9a15-c0955b515448.png");
                p.setTechStack(Arrays.asList("React", "Spring Boot", "Github"));
                p.setArchived(false);
                
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
                p.setImageUrl("https://image2url.com/r2/default/images/1771293140633-7f49237a-9fec-4736-b5cf-7bc8459753f3.png");
                p.setTechStack(Arrays.asList("React", "Spring Boot", "PostgreSQL"));
                p.setArchived(false);
                
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
                p.setImageUrl("https://image2url.com/r2/default/images/1771293879611-51ef3776-94d9-439c-b2fb-0389b7edab8a.png"); 
                p.setTechStack(Arrays.asList("React", "Spring Boot", "JavaScript", "TypeScript"));
                p.setArchived(false);
                
                System.out.println("Seeded project: Champlain PetClinic");
                projectRepo.save(p);
            }
        };
    }

    @Bean
    public CommandLineRunner seedWorkExperience(WorkExperienceRepository workRepo) {
        return args -> {
            if (workRepo.count() == 0) {
                WorkExperience w1 = new WorkExperience();
                w1.setTitle("Stage de fin d'études");
                w1.setCompany("Horizon Nature");
                w1.setPeriod("Été 2024");
                w1.setLocation("Saint-Laurent, Montréal, QC");
                w1.setResponsibilities(Arrays.asList(
                    "Développement d'une application full-stack pour la gestion d'inventaire",
                    "Participation aux réunions quotidiennes (scrum)",
                    "Collaboration avec l'équipe de développement pour résoudre les bugs"
                ));
                workRepo.save(w1);
                
                WorkExperience w2 = new WorkExperience();
                w2.setTitle("Travail d'été");
                w2.setCompany("Horizon Nature");
                w2.setPeriod("2018 - 2023");
                w2.setLocation("Saint-Laurent, Montréal, QC");
                w2.setResponsibilities(Arrays.asList(
                    "Manutention de marchandises",
                    "Travail d'équipe",
                    "Gestion du temps et des délais"
                ));
                workRepo.save(w2);
                
                System.out.println("Seeded work experiences");
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
