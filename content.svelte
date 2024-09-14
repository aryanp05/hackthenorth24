<script lang="ts">
    import { onMount } from "svelte";
    import objection from "data-base64:~assets/objection.gif";
    import phoenixObjection from "data-base64:~assets/phoenix-objection.mp3";
    import phoenixDefenseBg from "data-base64:~assets/phoenix-defense-bg.png";
    import phoenixDefenseTable from "data-base64:~assets/phoenix-defense-table.png";
    import phoenixSlamTalk from "data-base64:~assets/phoenix-slam-talk.gif";
    import thinking from "data-base64:~assets/thinking.mp3";
    import bgm from "data-base64:~assets/bgm.mp3";

    function scrapeCart() {
        let text = document.getElementsByClassName("_4QenE")[0].innerText;
        console.log(text);
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

        const payButton = document.getElementById("checkout-pay-button");
        payButton.innerText = "LOCKED";
        payButton.style.backgroundColor = "rgb(111,111,111)";
        payButton.style.cursor = "not-allowed";

        await new Promise((resolve) => setTimeout(resolve, 1500));
        payButton.onclick = null;
        gif.remove();

        // Create modal
        const backgroundDim = document.createElement("div");
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
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.padding = "20px";
        modal.style.borderRadius = "10px";
        modal.style.zIndex = "1001";
        modal.innerHTML = `
          <div style="position: relative; width: 1000px; height: 600px;">
              <img src=${phoenixDefenseBg} alt="Image 1" style="position: absolute; width: 1000px; height: auto;">
              <img src=${phoenixSlamTalk} alt="Image 1" style="position: absolute; width: 1000px; height: auto; top: -17.5%; left: -5%;">
              <img src=${phoenixDefenseTable} alt="Image 2" style="position: absolute; width: 1000px; height: auto; top: -17.5%;">
              <div style="border: 4px solid white; background: rgba(0, 0, 0, 0.6); position: absolute; width: 1000px; height: 160px; top: 68.5%;">
                  <h1 id="dialog" style="font-family: Renogare, sans-serif; color: white; padding: 8px; font-size: 24px;"></h1>
              </div>
          </div>
        `;
        backgroundDim.appendChild(modal);

        // Play background music
        const bgmAudio = new Audio(bgm);
        bgmAudio.loop = true;
        bgmAudio.volume = 0.2;
        bgmAudio.play();

        const thinkingDialog = "I kindly request a brief interlude to deliberate upon this matter with the utmost care.";
        const thinkingAudio = new Audio(thinking);
        thinkingAudio.play();

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

        const scapeInfo = scrapeCart();
        // Create a promise for the fetch request
        const fetchPromise = fetch("https://i9vk01x668.execute-api.us-east-2.amazonaws.com/dev/advisor", {
            method: "GET",
            headers: {
                cart: JSON.stringify(scapeInfo),
            }
        }).then(response => response.json());

        // Run both promises in parallel
        const [_, dialogResponse] = await Promise.all([dialogUpdatePromise, fetchPromise]);

        const dialog = dialogResponse.messages[0];

        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/gkybjio2CDKP8T49JOx6", {
            method: "POST",
            headers: {
                "xi-api-key": "sk_a25ba330ec35adc384040ad8e302db5c726622de2cbd84c5",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: dialog,
                voice_settings: {
                    stability: 0.3,
                    similarity_boost: 0.3,
                    style: 1.0,
                }
            }),
        });

        if (!response.ok) {
            console.log(response.statusText);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log(audioUrl);
        const ttsAudio = new Audio(audioUrl);
        ttsAudio.play();

        // TODO: Split dialog into 250 character chunks
        // Type dialog
        const dialogElement = document.getElementById("dialog");
        dialogElement.textContent = "";
        for (let i = 0; i < dialog.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            dialogElement.textContent += dialog[i];
        }
    };

    onMount(() => {
        new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
            const payButton = document.getElementById("checkout-pay-button");
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

