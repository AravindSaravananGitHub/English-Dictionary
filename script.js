const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
const loader = document.querySelector("#loader");
const wordOutput = document.querySelector("#word");
const meaning = document.querySelector("#meaning");
const audio = document.querySelector("#audioplayer");

btn.addEventListener("click", function () {
  if (input.value === "") {
    alert("Please Enter The Value");
  } else {
    generateOutput();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (input.value === "") {
      alert("Please Enter The Value");
    } else {
      generateOutput();
    }
  }
});

async function generateOutput() {
  try {
    let word = input.value;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const reusut = await fetch(apiUrl).then((res) => res.json());
    loader.style.display = "block";
    wordOutput.style.color = "black";
    meaning.style.color = "black";

    wordOutput.innerText = "";
    meaning.innerText = "";
    audio.style.display = "none";
    setTimeout(() => {
      loader.style.display = "none";

      if (reusut.title) {
        wordOutput.style.display = "block";
        wordOutput.innerText = `"It's Not a Proper Word"`;
        meaning.style.display = "block";
        meaning.innerText = `"Please Enter Properly"`;
      } else {
        wordOutput.style.display = "block";
        wordOutput.innerText = `Word : "${word}"`;
        meaning.style.display = "block";
        meaning.innerText = `Meaning : "${reusut[0].meanings[0].definitions[0].definition}"`;
        audio.style.display = "block";
        if (reusut[0].phonetics[0].audio) {
          audio.src = reusut[0].phonetics[0].audio;
        } else {
          audio.style.display = "none";
        }
      }
    }, 500);
  } catch {
    loader.style.display = "block";
    wordOutput.innerText = "";
    meaning.innerText = "";
    audio.style.display = "none";
    setTimeout(() => {
      loader.style.display = "none";
      wordOutput.style.display = "block";
      wordOutput.style.color = "red";
      wordOutput.innerText = `ERROR...bad network conection`;
      meaning.style.display = "block";
      meaning.style.color = "Green";
      meaning.innerText = `Trt again...`;
    }, 1000);
  }
}
