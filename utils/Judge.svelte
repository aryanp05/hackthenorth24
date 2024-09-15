<script lang="ts" context="module">
    import Background from 'data-base64:~assets/judge/background.jpg';
    import Closed_Eyes from 'data-base64:~assets/judge/closed_eyes.gif';
    import Headshake from 'data-base64:~assets/judge/headshake.gif';
    import Negative_Stand from 'data-base64:~assets/judge/negative_stand.gif';
    import Negative_Talk from 'data-base64:~assets/judge/negative_talk.gif';
    import Special_1 from 'data-base64:~assets/judge/special_1.gif';
    import Special_2 from 'data-base64:~assets/judge/special_2.gif';
    import Stand from 'data-base64:~assets/judge/stand.gif';
    import Stand_Talk from 'data-base64:~assets/judge/stand_talk.gif';
    import Surprised_Stand from 'data-base64:~assets/judge/surprised_stand.gif';
    import Surprised_Talk from 'data-base64:~assets/judge/surprised_talk.gif';
    import Table from 'data-base64:~assets/judge/table.png';

    export const JudgeBackground = Background;
    export const JudgeTable = Table;
    export const JudgeStates = {
        "positive": [Special_2, Stand, Stand_Talk],
        "negative": [Special_1, Negative_Stand, Negative_Talk],
        "surprised": [Surprised_Stand, Surprised_Talk, Surprised_Stand],
        "headshake": [Closed_Eyes, Headshake, Closed_Eyes],
    }
</script>