INSERT into Users
    (username, password)
VALUES
    ("admin", "admin";

use trivia;
INSERT into Questions
    (question, answer1, answer2, answer3, answer4, correctAnswer, UserID)
VALUES
    ("In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
        "William and Elizabeth",
        "Joseph and Catherine",
        "John and Mary",
        "George and Anne",
        3,
        1
),
    ("When did the Liberty Bell get its name?",
        "when it was made, in 1701",
        "when it rang on July 4, 1776",
        "in the 19th century, when it became a symbol of the abolition of slavery",
        "none of the above",
        3,
        1
),
    ("In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
        "Buttermilk",
        "Daisy",
        "Scout",
        "Tulip",
        1,
        1
),
    ("The Daniel Boon museum at the home where he died can best be described how?",
        "a log cabin in Kentucky",
        "a two-story clapboard house in Tennessee",
        "a four-story Georgian-style home in Missouri",
        "a three story brick house in Arkansas",
        3,
        1
),
    ("Which of the following items was owned by the fewest U.S. homes in 1990?",
        "home computer",
        "compact disk player",
        "cordless phone",
        "dishwasher",
        2,
        1
),
    ("Who holds the record for the most victories in a row on the professional golf tour?",
        "Jack Nicklaus",
        "Arnold Palmer",
        "Byron Nelson",
        "Ben Hogan",
        3,
        1
),
    ("Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
        "Reggie Jackson",
        "Harmon Killebrew",
        "Willie Mays",
        "Frank Robinson",
        3,
        1
),
    ("In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",
        8,
        18,
        38,
        58,
        2,
        1
);

select *
from Users;

-- DELETE  from users; 

select *
from Questions;

-- DELETE  from questions where id = 3; 

