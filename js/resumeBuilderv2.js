var octopus = {

    init: function() {
        displayData.init();
    }
};

var model = {

    "bio": {
        "name": "Valentin Weiss",
        "role": "Student",
        "contacts": {
            "email": "valentin.weiss@hotmail.com",
            "github": "WeissDev",
            "location": "Zurich, Switzerland"
        },
        "welcomeMessage": "Hi, I'm Valentin. Nice to meet you!",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "self-motivated learning",
            "writing awesome code",
            "sleep"
        ],
        "bioPic": "images/biopic.jpg"
    },

    "schools": [
        {
            "name": "University of Zurich",
            "degree": "Pursuing Bachelor Degree in Computer Science",
            "dates": "Starting September 2015 - future",
            "location": "Zurich, Switzerland",
            "major": "Software Systems"
        },
        {
            "name": "Kantonsschule Zurich Nord",
            "degree": "High School Degree",
            "dates": "2009 - 2013",
            "location": "Oerlikon, Switzerland",
            "major": "Modern Languages"
        }
    ],
    "onlineCourses": [
        {
            "school": "Udacity Inc.",
            "title": "Front-End Web Development Nanodegree",
            "dates": "January 2015 - Future",
            "url": "udacity.com"
        },
        {
            "school": "Treehouse Island Inc.",
            "title": "Front-End Web Development Track",
            "dates": "January 2015 - Future",
            "url": "teamtreehouse.com"
        },
        {
            "school": "Treehouse Island Inc.",
            "title": "Web Design Track",
            "dates": "December 2014 - Future",
            "url": "teamtreehouse.com"
        }
    ],

    "jobs": [
        {
            "employer": "Teleperformance",
            "title": "Client Representative",
            "dates": "November 2014 - Future",
            "location": "Wallisellen, Switzerland",
            "description": "Currently, I am working in this Customer Service position for a variety of client companies. This position requires basic knowledge in German, French, Italian and English since I get to deal with people from all over Switzerland."
        },
        {
            "employer": "Interdiscount",
            "title": "Sales Assistant",
            "dates": "December 2013",
            "location": "Zurich, Switzerland",
            "description": "Answering Customer\'s questions about all kinds of electronic goodies."
        }
    ],

    "projects": [
        {
            "title": "Flickr Photo Search",
            "dates": "2015",
            "description": "My first project using AJAX at Treehouse! It is a simple web app which lets you search the photo-sharing service Flickr for pictures.",
            "images": ["images/flickrajax.jpg",
                    "images/flickrajaxcode.jpg"]
        },
        {
            "title": "Make a Website Project",
            "dates": "2014",
            "description": "An introduction to Web Development. Fundamentals of HTML and CSS",
            "images": ["images/makeawebsite.png"]
        }
    ]
};

var displayData = {

    init: function() {
        displayData.render();
    },
    diplayBio: function() {

        var formattedName = HTMLheaderName.replace("%data%", model.bio.name),
            formattedRole = HTMLheaderRole.replace("%data%", model.bio.role),
            formattedBioPic = HTMLbioPic.replace("%data%", model.bio.bioPic),
            formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", model.bio.welcomeMessage),
            formattedEmail = HTMLemail.replace("%data%", model.bio.contacts.email),
            formattedGithub = HTMLgithub.replace("%data%", model.bio.contacts.github),
            formattedLocation = HTMLlocation.replace("%data%", model.bio.contacts.location);

        $("#topContacts").append(formattedEmail + formattedGithub + formattedLocation);
        $("#footerContacts").append(formattedEmail + formattedGithub + formattedLocation);

        $("#header").prepend(formattedRole);
        $("#header").prepend(formattedName);
        $("#header").append(formattedBioPic);
        $("#header").append(formattedWelcomeMsg);

        if (model.bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart);

            for(i in model.bio.skills) {
                $("#skills").append(HTMLskills.replace("%data%", model.bio.skills[i]));
            }
        }
    },
    displayEducation: function() {

        if(model.schools.length > 0) {
            for (i in model.schools) {
                $("#education").append(HTMLschoolStart);

                var formattedSchoolName = HTMLschoolName.replace("%data%", model.schools[i].name),
                    formattedSchoolDegree = HTMLschoolDegree.replace("%data%", model.schools[i].degree),
                    formattedSchoolDates = HTMLschoolDates.replace("%data%", model.schools[i].dates),
                    formattedSchoolLocation = HTMLschoolLocation.replace("%data%", model.schools[i].location),
                    formattedSchoolMajor = HTMLschoolMajor.replace("%data%", model.schools[i].major),
                    formattedSchoolData = formattedSchoolName + formattedSchoolDegree + formattedSchoolDates + formattedSchoolLocation + formattedSchoolMajor;

                $(".education-entry:last").append(formattedSchoolData);
            }
        }

        if(model.onlineCourses.length > 0) {
            $("#education").append(HTMLonlineClasses);



            for(i in model.onlineCourses) {
                $("#education").append(HTMLschoolStart);

                var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", model.onlineCourses[i].title),
                    formattedOnlineSchool = HTMLonlineSchool.replace("%data%", model.onlineCourses[i].school),
                    formattedOnlineDates = HTMLonlineDates.replace("%data%", model.onlineCourses[i].dates),
                    formattedOnlineURL = HTMLonlineURL.replace("%data%", model.onlineCourses[i].url);

                $(".education-entry:last").append(formattedOnlineTitle + formattedOnlineSchool);
                $(".education-entry:last").append(formattedOnlineDates);
                $(".education-entry:last").append(formattedOnlineURL);
            }
        }

    },
    displayWork: function() {
        for (job in model.jobs) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", model.jobs[job].employer),
            formattedTitle = HTMLworkTitle.replace("%data%", model.jobs[job].title),
            formattedDates = HTMLworkDates.replace("%data%", model.jobs[job].dates),
            formattedLocation = HTMLworkLocation.replace("%data%", model.jobs[job].location),
            formattedDescription = HTMLworkDescription.replace("%data%", model.jobs[job].description),
            formattedWorkInfo = formattedEmployer + formattedTitle + formattedDates + formattedLocation + formattedDescription;

        $(".work-entry:last").append(formattedWorkInfo);
        }
    },
    displayProjects: function() {
        for (project in model.projects) {
            $("#projects").append(HTMLprojectStart);

            var formattedTitle = HTMLprojectTitle.replace("%data%", model.projects[project].title),
                formattedDates = HTMLprojectDates.replace("%data%", model.projects[project].dates),
                formattedDescription = HTMLprojectDescription.replace("%data%", model.projects[project].description);

            $(".project-entry:last").append(formattedTitle + formattedDates + formattedDescription);

            if (model.projects[project].images.length > 0) {
                for (image in model.projects[project].images) {
                    var formattedImage = HTMLprojectImage.replace("%data%", model.projects[project].images[image]);
                    $(".project-entry:last").append(formattedImage);
                }
            }
        }
    },
    render: function() {
        displayData.diplayBio();
        displayData.displayEducation();
        displayData.displayWork();
        displayData.displayProjects();
    }
};

octopus.init();

var object = [

    {
        "headline":"HTML & CSS (8/10)",
        "value":8,
        "length":10,
        "description":"Pretty straightforward concept. Although CSS layout techniques can be quite tricky."

    },
    {
        "headline":"JavaScript (5/10)",
        "value": 5,
        "length": 10,
        "description": "My first experience with a programming language. Still need to improve but I\'m having a lot of fun with it!."

    },
    {
        "headline": "Python (2/10)",
        "value": 2,
        "length": 10,
        "description": "Just started out with Python. Don't really know a lot about it yet except how the syntax looks like."
    }

];

$(document).ready(function(){

    $("#skillset").skillset({

    object:object,
    duration:150

    });

});

// Internationalize Button
function inName(name) {
    name = name.trim().split(" ");
    console.log(name);
    name[1] = name[1].toUpperCase();
    name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();

    return name[0] + " " + name[1];
}

$("#main").append(internationalizeButton);

// map div
$("#mapDiv").append(googleMap);