// global variables tracking the user's preferences:
let searchTerm = "";
let openOnly = false;

const search = (ev) => {
  ev.preventDefault(); // overrides default button action

  // Set user's preferences (global variables) from the DOM:
  searchTerm = document.querySelector("#search_term").value;
  openOnly = document.querySelector("#is_open").checked;

  // Invoke the show matching courses function
  showMatchingCourses();
};

// Part 1.1a
const isClassOpen = (course) => {
  // modify this to accurately apply the filter:
  // if applying openOnly filter, then check this
  return course.EnrollmentCurrent < course.EnrollmentMax;
};

// Part 1.1b
const doesTermMatch = (course) => {
  if (course.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
    return true;
  } else {
    return false;
  }
};

// Part 1.2
const dataToHTML = (course) => {
  // modify this to be more detailed
  let status;
  if (!isClassOpen(course)) {
    status = '<i class"fasolid fa-circle-xmark"></i> "Closed"';
  } else {
    status = '<i class"fasolid fa-circle-check"></i> "Open"';
  }
  const seatsAvailable = course.EnrollmentCurrent - course.EnrollmentMax;
  if (seatsAvailable < 0) {
    seatsAvailable = 0;
  }
  return `
        <section class="course">
        <h2>${course.Code}: ${course.Title}</h2>
        <p>
            <i class="fa-solid fa-circle-check"></i> 
            Open  &bull; 10174 &bull; Seats Available: ${seatsAvailable}
        </p>
        <p>
            ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
        </p>
        <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
    `;
};

// Part 2
const showMatchingCourses = () => {
  console.log(`Search term: ${searchTerm}`);
  console.log(`Only show open classes: ${openOnly}`);
  console.log(`Course data:`, courseList);
  // output all of the matching courses to the screen:

  const container = document.querySelector(".courses");
  container.innerHTML = "";
  let matches = courseList.filter(doesTermMatch);
  if (openOnly) {
    // if they want to see open closes only
    matches = matches.filter(isClassOpen);
  }

  matches.forEach((course) => {
    const snippet = dataToHTML(course);
    container.insertAdjacentHTML("beforeend", snippet);
  });
};
