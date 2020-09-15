import "./style/index.scss";

const localhost = "http://localhost:8080";
const urlPathName = window.location.pathname;
const userInfoURL = localhost + urlPathName;
const educationInfoURL = `${localhost}${urlPathName}/educations`;

async function getData() {
  const userInfo = await fetch(userInfoURL).then((resp) => resp.json());
  const educationInfo = await fetch(educationInfoURL).then((resp) =>
    resp.json()
  );

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

async function render() {
  const { userInfo } = await getData();
  renderHeader(userInfo);
  renderAboutMe(userInfo);
}

render();
