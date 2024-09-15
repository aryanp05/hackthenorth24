<script lang="ts">
    import { onMount } from "svelte";
    import { PhoenixStates, PhoenixTable, PhoenixBackground } from "./utils/Phoenix.svelte";
    import { EdgeworthStates, EdgeworthTable, EdgeworthBackground } from "./utils/Edgeworth.svelte";
    import { JudgeStates, JudgeTable, JudgeBackground } from "./utils/Judge.svelte";
    import objection from "data-base64:~assets/objection.gif";
    import phoenixObjection from "data-base64:~assets/phoenix-objection.mp3";
    import thinking from "data-base64:~assets/thinking.mp3";
    import bgm from "data-base64:~assets/bgm.mp3";
    import yesNo from "data-base64:~assets/yesno.webp";
    import gavelSound from "data-base64:~assets/gavel.mp3";
    import gavelImage from "data-base64:~assets/gavel.webp";
    import judgeNo from "data-base64:~assets/judgeno.mp3";
    import judgeYes from "data-base64:~assets/judgeyes.mp3";
V
    let isBuying: boolean;
    const bgmAudio = new Audio(bgm);


    function scrapeCartShopify() {
        let text = document.getElementsByClassName("_4QenE")[0].innerText;
        // Extract product details using regex
        const productRegex = /(\d)\s*([^$]*)\s*\n?\s*(\d+)\s*x\s*\n?\s*\$(\d+\.\d{2})/g;
        const products = [];
        let match;

        while ((match = productRegex.exec(text)) !== null) {
            let name = match[2].trim();

            // Clean the product name by removing unwanted text like "low"
            name = name.replace(/\n.*$/, "").trim();

            products.push({
                quantity: parseInt(match[3].trim(), 10),
                name: name,
                price: parseFloat(match[4])
            });
        }

        // Extract subtotal, tax, and total
        const subtotalRegex = /Subtotal\s*\(.*?\)\s*\$(\d+\.\d{2})/;
        const taxRegex = /Estimated taxes\s*\$(\d+\.\d{2})/;
        const totalRegex = /Total\s*CAD\s*\$(\d+\.\d{2})/;  // Adjusted for "CAD" in between

        const subtotal = parseFloat(text.match(subtotalRegex)?.[1] || 0);
        const tax = parseFloat(text.match(taxRegex)?.[1] || 0);
        const total = parseFloat(text.match(totalRegex)?.[1] || 0);

        return {
            products,
            subtotal,
            tax,
            total
        };
    }

    function scrapeCartAmazon() {
        let text = document.getElementsByClassName("a-section a-spacing-mini sc-list-body sc-java-remote-feature")[0].innerText;

        const productRegex = /([A-Za-z0-9 ,\-()]+)\s*\$(\d+\.\d{2})[\s\S]*?Qty:\s*(\d+)/gm;

        const matches = [...text.matchAll(productRegex)];

        const products = matches.map(match => ({
            name: match[1].trim(),
            price: parseFloat(match[2]),
            quantity: parseInt(match[3])
        }));

        // Extract subtotal, tax, and total
        const prices: number[] = products.map(product => product.price * product.quantity);
        const subtotal = prices.reduce((acc, price) => acc + price, 0);
        const tax = subtotal * 0.13;
        const total = subtotal + tax;

        return {
            products,
            subtotal,
            tax,
            total
        };
    }

    let phoenixState = "think";
    const phoenixSprite = (stage: number) => {
        let leftOffset = -5;
        if (stage == 0) {
            leftOffset = 0;
        }
        stage = Math.min(stage, PhoenixStates[phoenixState].length - 1);
        return `
          <div style="position: relative; width: 1000px; height: 600px;">
              <img src=${PhoenixBackground} alt="Image 1" style="position: absolute; width: 1000px; height: auto;">
              <img src=${PhoenixStates[phoenixState][stage]} alt="Image 1" id="character" style="position: absolute; width: 1000px; height: auto; top: -17.5%; left: ${leftOffset}%;">
              <img src=${PhoenixTable} alt="Image 2" style="position: absolute; width: 1000px; height: auto; top: -17.5%">
              <div style="border: 4px solid white; background: rgba(0, 0, 0, 0.6); position: absolute; width: 1000px; height: 160px; top: 68.5%;">
                  <h1 id="dialog" style="font-family: Renogare, sans-serif; color: white; padding: 8px; font-size: 24px;"></h1>
              </div>
          </div>
        `;
    };

    let edgeworthState = Object.keys(EdgeworthStates)[Math.floor(Math.random() * Object.keys(EdgeworthStates).length)];
    const edgeSprite = (stage: number) => {
        stage = Math.min(stage, EdgeworthStates[edgeworthState].length - 1);
        return `
           <div style="position: relative; width: 1000px; height: 600px;">
              <img src=${PhoenixBackground} alt="Image 1" style="position: absolute; width: 1000px; height: auto; transform:scaleX(-1)">
              <img src=${EdgeworthStates[edgeworthState][stage]} alt="Image 1" id="character" style="position: absolute; width: 1000px; height: auto; top: -17.5%; left: -5%; ">
              <img src=${PhoenixTable} alt="Image 2" style="position: absolute; width: 1000px; height: auto; top: -17.5%; transform: scaleX(-1)">
              <div style="border: 4px solid white; background: rgba(0, 0, 0, 0.6); position: absolute; width: 1000px; height: 160px; top: 68.5%;">
                  <h1 id="dialog" style="font-family: Renogare, sans-serif; color: white; padding: 8px; font-size: 24px;"></h1>
              </div>
          </div>
        `;
    };

    async function judgeAnimation(isBuying: boolean) {
        console.log(isBuying ? "Yes" : "No");
        const modal = document.getElementById("modal");
        modal.innerHTML = `
           <div style="position: relative; width: 1000px; height: 700px;">
              <img src=${gavelImage} alt="Image 1" style="position: absolute; width: 1000px; height: auto;">
          </div>
        `;

        // Play audio
        const audio = new Audio(gavelSound);
        audio.play();

        // Sleep 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        modal.innerHTML = `
           <div style="position: relative; width: 1000px; height: 700px;">
              <img src=${JudgeBackground} alt="Image 1" style="position: absolute; width: 1000px; height: auto;">
              <img src=${JudgeStates["positive"][2]} alt="Image 1" id="character" style="position: absolute; width: 1000px; height: auto;">
              <div style="border: 4px solid white; background: rgba(0, 0, 0, 0.6); position: absolute; width: 1000px; height: 160px; top: 72.5%;">
                  <h1 id="dialog" style="font-family: Renogare, sans-serif; color: white; padding: 8px; font-size: 24px;"></h1>
              </div>
          </div>
        `;

        let dialog = "";
        if (isBuying) {
            dialog = "Order! After reviewing the evidence, I’ve made my decision. While spending should be approached cautiously, this purchase doesn’t tip the scales toward excess... this time. Therefore, the court allows the user to proceed to checkout—but with discretion. Case closed!";
        } else {
            dialog = "After reviewing the evidence, the court has decided. While the allure of this purchase is strong, the potential for overspending cannot be ignored. The user's budget must come first, and this item does not meet the threshold of necessity. Therefore, I rule against proceeding with the purchase. The court urges restraint in this matter. Case closed!";
        }

        // Play audio
        const audio2 = new Audio(isBuying ? judgeYes : judgeNo);
        audio2.play();

        const dialogElement = document.getElementById("dialog");
        dialogElement.textContent = "";
        for (let i = 0; i < dialog.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 65));
            if (i % 250 === 0) {
                dialogElement.textContent = "";
            }
            dialogElement.textContent += dialog[i];
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        modal.innerHTML = `
           <div style="position: relative; width: 1000px; height: 700px;">
              <img src=${JudgeBackground} alt="Image 1" style="position: absolute; width: 1000px; height: auto;">
              <img src=${JudgeStates["positive"][1]} alt="Image 1" id="character" style="position: absolute; width: 1000px; height: auto;">
              <div style="border: 4px solid white; background: rgba(0, 0, 0, 0.6); position: absolute; width: 1000px; height: 160px; top: 72.5%;">
                  <h1 id="dialog" style="font-family: Renogare, sans-serif; color: white; padding: 8px; font-size: 24px;">...</h1>
              </div>
          </div>
        `;
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (isBuying) {
            // Remove modal
            modal.remove();

            const backgroundDim = document.getElementById("background-dim");
            backgroundDim.remove();

            // Fix the button
            const payButton = document.getElementById("checkout-pay-button") ?? document.getElementsByName("proceedToRetailCheckout").item(0);
            payButton.onclick = null;
            payButton.setAttribute("type", "submit");
        } else {
            modal.remove();

            const backgroundDim = document.getElementById("background-dim");
            backgroundDim.remove();
        }

        bgmAudio.pause();
    }

    const yesNoButtons = () => {
        return `
           <div style="position: relative; width: 1000px; height: 600px;">
              <img src=${yesNo} alt="Image 1" style="position: absolute; width: 1000px; height: auto;">
              <div style="position: absolute; background-color: rgba(0, 0, 0, 0.7); width: 100%; height: auto">
                  <h1 style="font-size: 64px; color: white; white-space: pre;">         Would you like to buy?</h1>
              </div>
              <button style="position: absolute; font-size: 48px; top: 60%; left: 30%; color: white; background-color: rgb(35, 220, 51); padding: 8px; border-radius: 4px" id="b1"">YES</button>
              <button style="position: absolute; font-size: 48px; top: 60%; right: 30%; color: white; background-color: rgb(245, 66, 93); padding: 8px; border-radius: 4px" id="b2"">NO</button>
          </div>
        `;
    };

    const objectionAnimation = async () => {
        const gif = document.createElement("img");
        gif.src = objection;
        gif.style.position = "fixed";
        gif.style.top = "12.5%";
        gif.style.left = "12.5%";
        gif.style.width = "75%";
        gif.style.height = "75%";
        gif.style.zIndex = "9999";
        document.body.appendChild(gif);

        // Play audio
        const audio = new Audio(phoenixObjection);
        audio.play();

        const payButton = document.getElementById("checkout-pay-button") ?? document.getElementsByName("proceedToRetailCheckout").item(0);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        payButton.onclick = null;
        gif.remove();

        // Create modal
        const backgroundDim = document.createElement("div");
        backgroundDim.id = "background-dim";
        backgroundDim.style.position = "fixed";
        backgroundDim.style.top = "0";
        backgroundDim.style.left = "0";
        backgroundDim.style.width = "100%";
        backgroundDim.style.height = "100%";
        backgroundDim.style.backgroundColor = "rgba(0,0,0,0.5)";
        backgroundDim.style.zIndex = "1000";
        document.body.appendChild(backgroundDim);

        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.id = "modal";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.borderRadius = "10px";
        modal.style.zIndex = "1001";
        backgroundDim.appendChild(modal);

        modal.innerHTML = phoenixSprite(0);

        // Play background music
        bgmAudio.loop = true;
        bgmAudio.volume = 0.2;
        bgmAudio.play();

        const thinkingDialog = "I kindly request a brief interlude to deliberate upon this matter with the utmost care.";
        const thinkingAudio = new Audio(thinking);
        thinkingAudio.playbackRate = 1.2;
        const thinkingAudioPlayer = thinkingAudio.play();

        const thinkingDialogElement = document.getElementById("dialog");

        // Create a promise for the dialog update
        const dialogUpdatePromise = new Promise<void>((resolve) => {
            const promises = [];
            for (let i = 0; i < thinkingDialog.length; i++) {
                promises.push(new Promise<void>((resolve) => setTimeout(() => {
                    thinkingDialogElement.textContent += thinkingDialog[i];
                    resolve();
                }, 70 * i)));
            }
            Promise.all(promises).then(() => resolve());
        });

        let scrapeInfo;
        if (!window.location.toString().toLowerCase().includes("amazon")) {
            scrapeInfo = scrapeCartShopify();
        } else {
            scrapeInfo = scrapeCartAmazon();
        }
        console.log(scrapeInfo);

        // Create a promise for the fetch request
        const monthlyBudget = localStorage.getItem("monthly_budget") || 250;
        const fetchPromise = fetch("https://i9vk01x668.execute-api.us-east-2.amazonaws.com/dev/advisor", {
            method: "GET",
            headers: {
                cart: JSON.stringify(scrapeInfo),
                budget: monthlyBudget,
            }
        }).then(response => response.json());

        // Run both promises in parallel
        const [_, dialogResponse] = await Promise.all([dialogUpdatePromise, fetchPromise]);
        console.log(dialogResponse.messages);

        // voices for the agents
        const angelVoice = "pNInz6obpgDQGcFmaJgB";
        const devilVoice = "Xb7hH8MSUJpSbSDYk0k2";

        const makeTTSReq = async (text: string, voiceId: string) => {
            console.log(text, voiceId);
            const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: "POST",
                headers: {
                    "xi-api-key": "sk_0869cc6d5ed0b7617c27f9d69e4cc21724095ac6c7cd35fb",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text,
                    voice_settings: {
                        stability: 0.3,
                        similarity_boost: 0.3,
                        style: 1.0,
                        speed: 1.5
                    }
                }),
            });
            console.log("done tts");
            return res;
        };
        const updateCharacter = (stage: number, speaker: string) => {
            stage = Math.min(stage, speaker == "angel" ? PhoenixStates[phoenixState].length - 1 : EdgeworthStates[edgeworthState].length - 1);
            (document.getElementById("character") as HTMLImageElement).src = speaker == "angel" ? PhoenixStates[phoenixState][stage] : EdgeworthStates[edgeworthState][stage];
        };
        const showToUser = async (dialog: string, response: Response, speaker: string) => {
            if (!response.ok) {
                console.log(response.statusText);
            }

            if (speaker === "angel") {
                phoenixState = Object.keys(PhoenixStates)[Math.floor(Math.random() * Object.keys(PhoenixStates).length)];
                modal.innerHTML = phoenixSprite(0);
            } else if (speaker === "devil") {
                edgeworthState = Object.keys(EdgeworthStates)[Math.floor(Math.random() * Object.keys(EdgeworthStates).length)];
                modal.innerHTML = edgeSprite(0);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const ttsAudio = new Audio(audioUrl);
            updateCharacter(1, speaker);

            const typeDialog = async () => {
                const dialogElement = document.getElementById("dialog");
                dialogElement.textContent = "";
                for (let i = 0; i < dialog.length; i++) {
                    await new Promise((resolve) => setTimeout(resolve, 50));
                    if (i % 250 === 0) {
                        dialogElement.textContent = "";
                    }
                    dialogElement.textContent += dialog[i];
                }
            };
            await Promise.all([typeDialog(), new Promise(async (resolve, reject) => {
                try {
                    ttsAudio.onended = resolve;
                    await ttsAudio.play();
                } catch (e) {
                    resolve(null);
                }
            }).then(() => {
                updateCharacter(2, speaker);
            })]);
        };

        let [prevResponse, t] = await Promise.all([makeTTSReq(dialogResponse.messages[0], angelVoice), thinkingAudioPlayer]);
        for (let i = 0; i < dialogResponse.messages.length; ++i) {
            if (i == dialogResponse.messages.length - 1) {
                await showToUser(dialogResponse.messages[i], prevResponse, i % 2 == 0 ? "angel" : "devil");
                await new Promise(r => setTimeout(r, 5000)); // Long pause at the end
                break;
            }
            [t, prevResponse] = await Promise.all([showToUser(dialogResponse.messages[i], prevResponse, i % 2 == 0 ? "angel" : "devil"), makeTTSReq(dialogResponse.messages[i + 1], i % 2 == 1 ? devilVoice : angelVoice)]);
            await new Promise(r => setTimeout(r, 2000)); // Long pause between dialogues
            console.log(prevResponse);
        }
        modal.innerHTML = yesNoButtons();

        const b1 = document.getElementById("b1");
        const b2 = document.getElementById("b2");

        b1.onclick = async () => {
            isBuying = true;
            await judgeAnimation(true);
        };

        b2.onclick = async () => {
            isBuying = false;
            await judgeAnimation(false);
        };
    };

    onMount(() => {
        new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
            const payButton = document.getElementById("checkout-pay-button") ?? document.getElementsByName("proceedToRetailCheckout").item(0);
            payButton.setAttribute("type", "button");
            payButton.onclick = objectionAnimation;
        });
    });
</script>

<style>
    @font-face {
        font-family: "Renogare";
        font-style: normal;
        src: url(data-base64:~assets/Renogare-Regular.otf) format("opentype");
    }
</style>

