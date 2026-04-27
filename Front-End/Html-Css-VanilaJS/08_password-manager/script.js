const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");

  let arr = JSON.parse(data);

  arrUpdated = arr.filter((e) => {
    return e.website !== website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert("Deleted");
  showPasswords();
};

const showPasswords = () => {
  let tb = document.querySelector("table");

  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data) || [];

  if (arr.length === 0) {
    tb.innerHTML = `Empty`;
  } else {
    tb.innerHTML = `<tr>
                <th>Website</th>
                <th>Username/Email</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`;

    let str = ``;

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      console.log(element);

      str += `<tr>
  <td class="tData">
    <span>${element.website}</span>
    <button class="btnC" onclick="navigator.clipboard.writeText('${element.website}'); showCopyAlert();">
      <img src="./img/copy.svg" alt="">
    </button>
  </td>

  <td class="tData">
    <span>${element.username}</span>
    <button class="btnC" onclick="navigator.clipboard.writeText('${element.username}'); showCopyAlert();">
      <img src="./img/copy.svg" alt="">
    </button>
  </td>

  <td>
  <span class="passText">••••••••</span>

  <button class="btnT" onclick="togglePassword(this, '${element.password}')">👁️</button>

  <button class="btnC" onclick="navigator.clipboard.writeText('${element.password}'); showCopyAlert();">
    <img src="./img/copy.svg" alt="">
  </button>
    </td>

  <td>
    <button class="btnD" onclick="deletePassword('${element.website}')">Delete</button>
  </td>
</tr>`;
    }

    tb.innerHTML = tb.innerHTML + str;
  }
};

showPasswords();

// login to fill the table

document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

  if (username.value.trim() !== "" && password.value.length >= 8) {
    // Check duplicate
    let isDuplicate = passwords.some((item) => {
      return (
        item.website === website.value &&
        item.username === username.value &&
        item.password === password.value
      );
    });

    if (isDuplicate) {
      alert("This data already exists!");
      return;
    }

    //Save if not duplicate
    passwords.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });

    localStorage.setItem("passwords", JSON.stringify(passwords));
    alert("Password Saved");

    website.value = "";
    username.value = "";
    password.value = "";
  } else {
    if (username.value.trim() === "") {
      alert("username and password required!!");
    } else {
      alert("password length must be at least 8");
    }
  }
  showPasswords();
});

//copy animation
function showCopyAlert() {
  let alertBox = document.querySelector(".copyAlert");

  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}

let toggleBtn = document.querySelector(".togglePass");
let passwordInput = document.querySelector("#password");

// input password toggle
toggleBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "👁️";
  }
});

// On table password toggle
function togglePassword(btn, realPass) {
  let span = btn.parentElement.querySelector(".passText");

  if (span.innerText === "••••••••") {
    span.innerText = realPass;
    btn.innerText = "🙈";
  } else {
    span.innerText = "••••••••";
    btn.innerText = "👁️";
  }
}
