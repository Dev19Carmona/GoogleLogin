
const { sendMail } = require("../functions/mail");
const { HTML_passwordChange } = require("../html/PasswordChange");
const puppeteer = require("puppeteer");
const url = "https://www.farfetch.com/co/sets/men/nike-dunks.aspx";
const Mail_send = async (req, res) => {
  try {
    const contentHTML = HTML_passwordChange;
    const mailOptions = {
      from: "Eagle_Soft",
      to: "camilocr1294@gmail.com",
      subject: "Cambio de Contraseña EagleSoft",
      html: contentHTML,
    };
    await sendMail(mailOptions);
    res.status(200).json({ message: "EMAIL_SENDING" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const Open_window = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 200,
    });
    const page = await browser.newPage();
    await page.goto("https://www.farfetch.com/co/sets/men/nike-dunks.aspx");
    await browser.close();
    res.status(200).json({ message: "WEBSITE_OPEN" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const captureScreenshot = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 200,
    });
    const page = await browser.newPage();
    await page.goto("https://www.farfetch.com/co/sets/men/nike-dunks.aspx");
    await page.screenshot({ path: "example.png" });
    await browser.close();
    res.status(200).json({ message: "SCREENSHOT" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

async function navigateWebPage() {
  const browser = await puppeteer.launch({
    slowMo: 200,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com");
  await page.click('a[href="/login"]');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await browser.close();
}

async function getDataFromWebPage(req, res) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    await page.goto(url);

    const data = await page.evaluate(async () => {
      const nodeListToInnerTextArray = (nodeList) => {
        var arrayFromNodeList = Array.from(nodeList);
          var result = [];
          arrayFromNodeList.forEach(function (element) {
            result.push(element.innerText);
          });
          return result
      }
      let title = document.querySelector("h1").innerText;
      let nodeList_Descriptions = document.querySelectorAll("[data-component='ProductCardDescription']");
      let nodeList_Prices = document.querySelectorAll("[data-component='ProductCardDescription']");

      const descriptions = nodeListToInnerTextArray(nodeList_Descriptions);

      console.log(descriptions);

      return {
        title,
        descriptions,
      };
    });

    console.log(data);
    await browser.close();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  Mail_send,
  Open_window,
  captureScreenshot,
  navigateWebPage,
  getDataFromWebPage,
};
