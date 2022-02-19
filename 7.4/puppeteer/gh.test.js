let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  }, 45000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 45000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 45000);
});

test("Check page with enterprise'", async () => {
  await page.goto("https://github.com/enterprise");  
  const actual = await page.$eval(
    "h1", (link) => link.textContent);
  expect(actual).toContain("Build like the best");
  await page.screenshot({ path: "Screenshots/enterprise.png" });
}, 45000);

test("Check page with education", async () => {
  await page.goto("https://education.github.com/");  
  const actual = await page.$eval(
    "h1", (link) => link.textContent);
  expect(actual).toContain("Where future developers meet");
  await page.screenshot({ path: "Screenshots/education.png" });
}, 45000);

test("Check page with security", async () => {
  await page.goto("https://github.com/features/security");  
  const actual = await page.$eval(
    "h1", (link) => link.textContent);
  expect(actual).toContain("Secure at every");
  await page.screenshot({ path: "Screenshots/security.png" });
}, 45000);
