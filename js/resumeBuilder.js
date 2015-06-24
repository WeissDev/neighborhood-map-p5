// Bio Section
var bio = {
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
}

bio.display = function() {

    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
    var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);

    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

    $("#topContacts").append(formattedEmail);
    $("#topContacts").append(formattedGithub);
    $("#topContacts").append(formattedLocation);

    $("#footerContacts").append(formattedEmail);
    $("#footerContacts").append(formattedGithub);
    $("#footerContacts").append(formattedLocation);

    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);
    $("#header").append(formattedBioPic);
    $("#header").append(formattedWelcomeMsg);

    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);

        for(i in bio.skills) {
            $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
        }
    }
}

bio.display();

//Skillset Section
var object = [

    {
        "headline":"HTML & CSS (8/10)",
        "value":8,
        "length":10,
        "description":"Pretty straightforward concept. Although CSS layout techniques can be quite tricky."

    },
    {
        "headline":"JavaScript (5/10)",
        "value":5,
        "length":10,
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


// Education Section
var education = {
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
    ]
}

education.display = function() {
    if(education.schools.length > 0) {
        for (i in education.schools) {
            $("#education").append(HTMLschoolStart);

            var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[i].name);
            var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
            var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
            var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
            var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[i].major);

            $(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);
            $(".education-entry:last").append(formattedSchoolDates);
            $(".education-entry:last").append(formattedSchoolLocation);
            $(".education-entry:last").append(formattedSchoolMajor)
        }
    }

    if(education.onlineCourses.length > 0) {
        $("#education").append(HTMLonlineClasses);
        for(i in education.onlineCourses) {
            $("#education").append(HTMLschoolStart);

            var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[i].title);
            var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[i].school);
            var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[i].dates);
            var formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[i].url);

            $(".education-entry:last").append(formattedOnlineTitle + formattedOnlineSchool);
            $(".education-entry:last").append(formattedOnlineDates);
            $(".education-entry:last").append(formattedOnlineURL);
        }
    }
}

education.display();
// Work Section
var work = {
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
    ]
}

work.display = function() {
    for (job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        var formattedWorkInfo = formattedEmployer + formattedTitle + formattedDates + formattedLocation + formattedDescription;

        $(".work-entry:last").append(formattedWorkInfo);
    }
}

work.display();

// Projects Section
var projects = {
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
}

projects.display = function() {
    for (project in projects.projects) {
        $("#projects").append(HTMLprojectStart);

        var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
        var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);

        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedDates);
        $(".project-entry:last").append(formattedDescription);

        if (projects.projects[project].images.length > 0) {
            for (image in projects.projects[project].images) {
                var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
                $(".project-entry:last").append(formattedImage);
            }
        }
    }
}

projects.display();

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