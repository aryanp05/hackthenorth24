<script lang="ts" context="module">
    import Chug from 'data-base64:~assets/phoenix/chug.mp3';
    import Damage from 'data-base64:~assets/phoenix/damage.mp3';
    import Damage_Anim from 'data-base64:~assets/phoenix/damage.gif';
    import Breakdown from 'data-base64:~assets/phoenix/breakdown.gif';
    import Coffee_Stained from 'data-base64:~assets/phoenix/coffee_stained.gif';
    import Coffee_Stained_Idle from 'data-base64:~assets/phoenix/coffee_stained_idle.gif';
    import Cornered from 'data-base64:~assets/phoenix/cornered.gif';
    import Cornered_Talk from 'data-base64:~assets/phoenix/cornered_talk.gif';
    import Headshake from 'data-base64:~assets/phoenix/headshake.gif';
    import Nod from 'data-base64:~assets/phoenix/nod.gif';
    import Point_Stand from 'data-base64:~assets/phoenix/point_stand.gif';
    import Point_Start from 'data-base64:~assets/phoenix/point_start.gif';
    import Point_Talk from 'data-base64:~assets/phoenix/point_talk.gif';
    import Read_Stand from 'data-base64:~assets/phoenix/read_stand.gif';
    import Read_Talk from 'data-base64:~assets/phoenix/read_talk.gif';
    import Silly_Stand from 'data-base64:~assets/phoenix/silly_stand.gif';
    import Silly_Talk from 'data-base64:~assets/phoenix/silly_talk.gif';
    import Sip from 'data-base64:~assets/phoenix/sip.gif';
    import Sip_Stand from 'data-base64:~assets/phoenix/sip_stand.gif';
    import Sip_Talk from 'data-base64:~assets/phoenix/sip_talk.gif';
    import Slam from 'data-base64:~assets/phoenix/slam.gif';
    import Slam_Stand from 'data-base64:~assets/phoenix/slam_stand.gif';
    import Slam_Talk from 'data-base64:~assets/phoenix/slam_talk.gif';
    import Smirk_Stand from 'data-base64:~assets/phoenix/smirk_stand.gif';
    import Smirk_Talk from 'data-base64:~assets/phoenix/smirk_talk.gif';
    import Stand from 'data-base64:~assets/phoenix/stand.gif';
    import Stand_Talk from 'data-base64:~assets/phoenix/stand_talk.gif';
    import Think_Stand from 'data-base64:~assets/phoenix/think_stand.gif';
    import Think_Talk from 'data-base64:~assets/phoenix/think_talk.gif';
    import Yell_Stand from 'data-base64:~assets/phoenix/yell_stand.gif';
    import Yell_Talk from 'data-base64:~assets/phoenix/yell_talk.gif';
    import Table from 'data-base64:~assets/phoenix/table.png';
    import Background from 'data-base64:~assets/phoenix/background.png';


    // export an object mapping a string to a series of images
    // init, talk, idle, optional: sound effect
    export const PhoenixStates = {
        "breakdown": [Breakdown, Breakdown, Breakdown],
        //"coffee":[Coffee_Stained, Coffee_Stained,Coffee_Stained_Idle],
        "cornered":[Cornered, Cornered_Talk, Cornered],
        "headshake":[Headshake, Stand_Talk, Stand],
        "nod":[Nod, Stand_Talk, Stand],
        "point":[Point_Start, Point_Talk, Point_Stand],
        "read":[Read_Stand, Read_Talk, Read_Stand],
        "silly":[Silly_Stand, Silly_Talk, Silly_Stand],
        "sip":[Sip, Sip_Talk, Sip_Stand, Chug],
        "slam":[Slam, Slam_Talk, Slam_Stand],
        "smirk":[Smirk_Stand, Smirk_Talk, Smirk_Stand],
        "stand":[Stand, Stand_Talk, Stand],
        "think":[Think_Stand, Think_Talk, Think_Stand],
        //"yell":[Yell_Stand, Yell_Talk, Yell_Stand],
        "damage":[Damage_Anim, Cornered_Talk, Cornered, Damage]
    };
    export const PhoenixBackground = Background;
    export const PhoenixTable = Table;
</script>