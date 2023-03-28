window.onload = function () {
  const users = [
      {
        id: 1,
        name: ["Oumar", "DIOP"],
        phone: "78 444 34 35",
        email: "oumar@example.com",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      },
      {
        id: 2,
        name: ["Kadiata", "BA"],
        phone: "78 471 82 00",
        email: "kadia@example.com",
        img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },
      {
        id: 3,
        name: ["Amar", "THIAM"],
        phone: "70 988 77 76",
        email: "amar@example.com",
        img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },
    ],
    transactions = [
      { id: 1, number: 1, date: "24-05-2022", sense: -1, amount: 12000 },
      { id: 1, number: 2, date: "09-11-2021", sense: 1, amount: 12000 },
      { id: 3, number: 3, date: "31-01-2023", sense: -1, amount: 12000 },
      { id: 2, number: 4, date: "02-03-2023", sense: 1, amount: 12000 },
    ],
    elements = {
      get fn() {
        return document.getElementById("firstname");
      },
      get ln() {
        return document.getElementById("lastname");
      },
      get phone() {
        return document.getElementById("phone");
      },
      get email() {
        return document.getElementById("email");
      },
      get img() {
        return document.getElementById("user-img");
      },
      get tsts() {
        return document
          .querySelector(".transactions")
          .querySelector(".content")
          .querySelector("tbody");
      },
      get nextBtn() {
        return document.querySelector("button.next");
      },
      get addMnt() {
        return document.getElementById("mnt");
      },
      get addTrans() {
        return document.getElementById("trans");
      },
      get trans() {
        let trans = this.addMnt;
        while (!trans.classList.contains("form")) trans = trans.parentNode;
        delete this.trans;
        return (this.trans = trans);
      },
      get addBtn() {
        return document.getElementById("btnDetail");
      },
      get addSave() {
        return this.trans.querySelector('button[type="button"]');
      },
      get addError() {
        return this.trans.querySelector(".errorMsg");
      },
    };

  function userExists(userId) {
    return users.filter((e) => e.id === userId).length ? true : false;
  }

  function getUserTransactions(userId) {
    if (!userExists(userId)) throw new Error("This user Id is not exists.");
    return transactions.filter((e) => e.id === userId);
  }

  function fillCard(infos) {
    elements.fn.innerHTML = infos.name[0];
    elements.ln.innerHTML = infos.name[1];
    elements.email.innerHTML = infos.email;
    elements.phone.innerHTML = infos.phone;
    elements.img.src = infos.img;

    const tsts = getUserTransactions(infos.id);
    elements.tsts.innerHTML = "";
    for (const t of tsts) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${t.number}</td>
        <td>${t.date}</td>
        <td>${t.sense}</td>
        <td>${t.amount}</td>
      `;
      elements.tsts.appendChild(tr);
    }
  }

  let currentUser = 0;
  fillCard(users[currentUser]);
  elements.trans.style.display = "none";

  elements.nextBtn.addEventListener("click", function () {
    currentUser = ++currentUser % users.length;
    console.log(currentUser);
    fillCard(users[currentUser]);
  });

  elements.addBtn.addEventListener("click", function () {
    elements.trans.style.display = "block";
  });

  elements.addSave.addEventListener("click", function () {
    let amount = elements.addMnt.value,
      trans = elements.addTrans.value;

    if (!amount.length || isNaN(amount) || (trans !== "d" && trans !== "r")) {
      elements.addError.innerHTML = '<i style="color:red">Invalide</i>';
    } else {
      let transNum = 1,
        date = new Date();
      date = `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth()
      ).padStart(2, "0")}-${date.getFullYear()}`;

      transactions.forEach(
        (e) => (transNum = e.number > transNum ? e.number : transNum)
      );
      transactions.push({
        id: currentUser + 1,
        number: transNum,
        sense: trans === "d" ? 1 : -1,
        amount: +amount,
        date: date,
      });
      elements.trans.style.display = "none";
      fillCard(users[currentUser]);
    }
  });
};
