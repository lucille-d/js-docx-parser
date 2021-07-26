import "./mammoth.browser.js";

const fileInput = document.getElementById("file-input");
const outputDiv = document.getElementById("output")
fileInput.addEventListener("change", parseFile);


async function parseFile(event) {
    if (!event || !event.target || !event.target.files) return;

    const file = event.target.files[0];
    const fileBuffer = await file.arrayBuffer();
    const parseResult = await mammoth.convert({ arrayBuffer: fileBuffer });
    console.log(parseResult);

    outputDiv.innerHTML = parseResult.value;

    addUI();
}

async function addUI() {
    const paragraphs = outputDiv.getElementsByTagName("p");
    Array.from(paragraphs).forEach(p => {
        p.addEventListener("click", async (e) => {
            console.log(e.target);
            await navigator.clipboard.writeText(e.target.outerHTML);
        })
    });
}

// const buffer = await blob.arrayBuffer();

// const result = await mammoth.convertToHtml({ path: "./test_files/spiders.docx" });
// console.log(result);
