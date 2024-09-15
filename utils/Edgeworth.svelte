<script lang="ts" context="module">
    import Arms_Crossed from 'data-base64:~assets/edgeworth/arms_crossed.gif';
    import Arms_Crossed_Talk from 'data-base64:~assets/edgeworth/arms_crossed_talk.gif';
    import Bow from 'data-base64:~assets/edgeworth/bow.gif';
    import Bow_Idle from 'data-base64:~assets/edgeworth/bow_idle.gif';
    import Confident from 'data-base64:~assets/edgeworth/confident.gif';
    import Confident_Talk from 'data-base64:~assets/edgeworth/confident_talk.gif';
    import Cornered from 'data-base64:~assets/edgeworth/cornered.gif';
    import Cornered_Talk from 'data-base64:~assets/edgeworth/cornered_talk.gif';
    import Damage from 'data-base64:~assets/edgeworth/damage.gif';
    import Desk_Slam from 'data-base64:~assets/edgeworth/desk_slam.gif';
    import Desk_Stand from 'data-base64:~assets/edgeworth/desk_stand.gif';
    import Desk_Talk from 'data-base64:~assets/edgeworth/desk_talk.gif';
    import Point_Stand from 'data-base64:~assets/edgeworth/point_stand.gif';
    import Point_Talk from 'data-base64:~assets/edgeworth/point_talk.gif';
    import Read from 'data-base64:~assets/edgeworth/read.gif';
    import Read_Talk from 'data-base64:~assets/edgeworth/read_talk.gif';
    import Special_1 from 'data-base64:~assets/edgeworth/special_1.gif';
    import Special_2 from 'data-base64:~assets/edgeworth/special_2.gif';
    import Stand from 'data-base64:~assets/edgeworth/stand.gif';
    import Stand_Talk from 'data-base64:~assets/edgeworth/stand_talk.gif';
    import Yell_Stand from 'data-base64:~assets/edgeworth/yell_stand.gif';
    import Table from 'data-base64:~assets/edgeworth/table.png';
    import Background from 'data-base64:~assets/edgeworth/background.jpg';

    // export an object mapping a string to a series of images
    // init, talk, idle, sound effect
    export const EdgeworthStates = {
        "arms_crossed": [Arms_Crossed, Arms_Crossed_Talk,Arms_Crossed],
        "bow": [Bow, Bow_Idle, Bow_Idle],
        "confident": [Confident, Confident_Talk, Confident],
        "cornered": [Cornered, Cornered_Talk, Cornered],
        "desk_slam": [Desk_Slam, Desk_Talk, Desk_Stand],
        "point": [Point_Stand, Point_Talk, Point_Stand],
        "read": [Read, Read_Talk, Read],
        "special_1": [Stand, Special_1],
        "special_2": [Special_2, Confident_Talk, Confident],
        "stand": [Stand, Stand_Talk, Stand],
        "damage": [Damage],
        //"yell": [Yell_Stand]
    }
    export const EdgeworthBackground = Background;
    export const EdgeworthTable = Table;
</script>