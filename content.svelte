<script lang="ts">
    import { onMount } from "svelte";
    import objection from "data-base64:~assets/objection.gif";
    import phoenixObjection from "data-base64:~assets/phoenix-objection.mp3";
    import phoenixDefenseBg from "data-base64:~assets/phoenix-defense-bg.png";
    import phoenixDefenseTable from "data-base64:~assets/phoenix-defense-table.png";
    import phoenixSlamTalk from "data-base64:~assets/phoenix-slam-talk.gif";

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
                  <h1 id="dialog" style="font-family: Renogare, sans-serif; color: white; padding: 8px;">...</h1>
              </div>
          </div>
        `;
        backgroundDim.appendChild(modal);

        const dialogResponse = await fetch("https://i9vk01x668.execute-api.us-east-2.amazonaws.com/dev/advisor", {
            method: "GET",
            headers: {}
        });
        const dialog = (await dialogResponse.json()).messages[0];

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

        // Type dialog
        const dialogElement = document.getElementById("dialog");
        dialogElement.textContent = "";
        for (let i = 0; i < dialog.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 70));
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
        src: url(data-base64:~assets/Renogare-Regular.otf) format("otf");
    }
</style>

