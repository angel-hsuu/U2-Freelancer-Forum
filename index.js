/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// create function with random name, occupation, and price
// average of all freelancers in state
// loop over my array of freelancer objects and sum up freelancer.rate and then  divide by freelancers.length

//const AVG = //the function you wrote above


/** @returns {Freelancer} a randomly generated freelancer */
function makeFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate = Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) + PRICE_RANGE.min;

  return { name, occupation, rate };
}

// === State ===
const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
const averageRate = getAverageRate(); // ✅ state variable for average rate

/** @returns {number} the average hourly rate of all freelancers */
function getAverageRate() {
  const total = freelancers.reduce((sum, f) => sum + f.rate, 0);
  return (total / freelancers.length).toFixed(2);
}

/**
 * @param {Freelancer} freelancer
 * @returns {HTMLTableRowElement} a table row representing the freelancer
 */
function FreelancerRow(freelancer) {
  const { name, occupation, rate } = freelancer;

  const $row = document.createElement("tr");
  $row.innerHTML = `
    <td>${name}</td>
    <td>${occupation}</td>
    <td>$${rate}</td>
  `;
  return $row;
}

/** @returns {HTMLTableSectionElement} all freelancer rows inside a <tbody> */
function FreelancerRows() {
  const $tbody = document.createElement("tbody");

  const $rows = freelancers.map(FreelancerRow);
  $tbody.replaceChildren(...$rows);

  return $tbody;
}

/** @returns {HTMLElement} a <p> with the average hourly rate */
function AverageRate() {
  const $p = document.createElement("p");
  $p.textContent = `The average rate is $${averageRate}.`;
  return $p;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <div id="avg"></div>
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>OCCUPATION</th>
          <th>RATE</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;

  $app.querySelector("#avg").replaceWith(AverageRate());
  $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
}

render();