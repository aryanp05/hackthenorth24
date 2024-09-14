<script>
    import Chug from 'assets/phoenix/chug.mp3';
    import Damage from 'assets/phoenix/damage.mp3';
    import Damage_Anim from 'assets/phoenix/damage.gif';
    import Breakdown from 'assets/phoenix/breakdown.gif';
    import Coffee_Stained from 'assets/phoenix/coffee_stained.gif';
    import Coffee_Stained_Idle from 'assets/phoenix/coffee_stained_idle.gif';
    import Cornered from 'assets/phoenix/cornered.gif';
    import Cornered_Talk from 'assets/phoenix/cornered_talk.gif';
    import Headshake from 'assets/phoenix/headshake.gif';
    import Nod from 'assets/phoenix/nod.gif';
    import Point_Stand from 'assets/phoenix/point_stand.gif';
    import Point_Start from 'assets/phoenix/point_start.gif';
    import Point_Talk from 'assets/phoenix/point_talk.gif';
    import Read_Stand from 'assets/phoenix/read_stand.gif';
    import Read_Talk from 'assets/phoenix/read_talk.gif';
    import Silly_Stand from 'assets/phoenix/silly_stand.gif';
    import Silly_Talk from 'assets/phoenix/silly_talk.gif';
    import Sip from 'assets/phoenix/sip.gif';
    import Sip_Stand from 'assets/phoenix/sip_stand.gif';
    import Sip_Talk from 'assets/phoenix/sip_talk.gif';
    import Slam from 'assets/phoenix/slam.gif';
    import Slam_Stand from 'assets/phoenix/slam_stand.gif';
    import Slam_Talk from 'assets/phoenix/slam_talk.gif';
    import Smirk_Stand from 'assets/phoenix/smirk_stand.gif';
    import Smirk_Talk from 'assets/phoenix/smirk_talk.gif';
    import Stand from 'assets/phoenix/stand.gif';
    import Stand_Talk from 'assets/phoenix/stand_talk.gif';
    import Think_Stand from 'assets/phoenix/think_stand.gif';
    import Think_Talk from 'assets/phoenix/think_talk.gif';
    import Yell_Stand from 'assets/phoenix/yell_stand.gif';
    import Yell_Talk from 'assets/phoenix/yell_talk.gif';


    // export an object mapping a string to a series of images
    // init, talk, idle, optional: sound effect
    export const PhoenixStates = {
        "breakdown": [Breakdown, Breakdown, Breakdown],
        "coffee":[Coffee_Stained, Coffee_Stained,Coffee_Stained_Idle],
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
        "yell":[Yell_Stand, Yell_Talk, Yell_Stand],
        "damage":[Damage_Anim, Cornered_Talk, Cornered, Damage],
    };
</script>