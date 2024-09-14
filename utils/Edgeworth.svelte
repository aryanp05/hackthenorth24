<script>
    import Arms_Crossed from 'assets/edgeworth/arms_crossed.gif';
    import Arms_Crossed_Talk from 'assets/edgeworth/arms_crossed_talk.gif';
    import Bow from 'assets/edgeworth/bow.gif';
    import Bow_Idle from 'assets/edgeworth/bow_idle.gif';
    import Confident from 'assets/edgeworth/confident.gif';
    import Confident_Talk from 'assets/edgeworth/confident_talk.gif';
    import Cornered from 'assets/edgeworth/cornered.gif';
    import Cornered_Talk from 'assets/edgeworth/cornered_talk.gif';
    import Damage from 'assets/edgeworth/damage.gif';
    import Desk_Slam from 'assets/edgeworth/desk_slam.gif';
    import Desk_Stand from 'assets/edgeworth/desk_stand.gif';
    import Desk_Talk from 'assets/edgeworth/desk_talk.gif';
    import Point_Stand from 'assets/edgeworth/point_stand.gif';
    import Point_Talk from 'assets/edgeworth/point_talk.gif';
    import Read from 'assets/edgeworth/read.gif';
    import Read_Talk from 'assets/edgeworth/read_talk.gif';
    import Special_1 from 'assets/edgeworth/special_1.gif';
    import Special_2 from 'assets/edgeworth/special_2.gif';
    import Stand from 'assets/edgeworth/stand.gif';
    import Stand_Talk from 'assets/edgeworth/stand_talk.gif';
    import Yell_Stand from 'assets/edgeworth/yell_stand.gif';

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
        "yell": [Yell_Stand]
    }
</script>