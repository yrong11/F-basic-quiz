import "./style/index.scss";

const localhost = "http://localhost:8080";
const urlPathName = window.location.pathname;
const userInfoURL = localhost + urlPathName;
const educationInfoURL = `${localhost}${urlPathName}/educations`;

async function getData() {
  let userInfo;
  let educationInfo;
  const userResp = await fetch(userInfoURL);
  if (userResp.status === 200) {
    userInfo = await userResp.json();
    educationInfo = await fetch(educationInfoURL).then((resp) => resp.json());
  }
  return { userInfo, educationInfo };
}

function renderHeader(userInfo) {
  const { name, year, avatar } = userInfo;
  const basicInfo = document.getElementById("basic-info");
  const avatarImg = document.getElementById("avatar");
  basicInfo.innerHTML = `my name is ${name} ${year}year old and this is my resume/cv`;
  avatarImg.src = avatar;
}

function renderAboutMe(userInfo) {
  const { description } = userInfo;
  const descriptionDOM = document.getElementById("description");
  descriptionDOM.innerHTML = description;
}

function renderEducation(educationInfo) {
  const educations = document.getElementById("educations");
  if (educationInfo instanceof Array)
    educationInfo.forEach((item) => {
      const education = document.createElement("div");
      education.setAttribute("class", "education-info");
      const year = document.createElement("h3");
      year.setAttribute("class", "education-year");
      year.innerHTML = item.year;

      const content = document.createElement("div");
      content.setAttribute("class", "education-content");

      const title = document.createElement("h3");
      title.innerHTML = item.title;

      const desc = document.createElement("p");
      desc.innerHTML = item.description;

      content.appendChild(title);
      content.appendChild(desc);
      education.appendChild(year);
      education.appendChild(content);
      educations.appendChild(education);
    });
}

async function render() {
  const { userInfo, educationInfo } = await getData();
  if (userInfo !== undefined) {
    renderHeader(userInfo);
    renderAboutMe(userInfo);
    renderEducation(educationInfo);
  }
}
render();
