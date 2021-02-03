import React from 'react'
import { View, Text,Image,TouchableOpacity,Alert,TouchableWithoutFeedback } from 'react-native'
import images from '../../Constants/images'
import styles from './styles'

const Main = () => {

    const [gameState,setGameState] = React.useState([
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ])
    const [currentPlayer,setCurrentPlayer] = React.useState(1)

    React.useEffect(()=>{
        initializeGame()
    },[])

    const initializeGame =()=>{
        setGameState([
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ])
        setCurrentPlayer(1)
    }

    const setGameWinner =()=>{
        const NUM_TILES =  3;
        var arr = gameState;
        var sum;

        //Check rows
        for(var i=0;i< NUM_TILES;i++){
            sum = arr[i][0] + arr[i][1] + arr[i][2]
            if(sum == 3){ return 1;}
            else if (sum == -3){return -1;}
        }

        //Check columns
        for(var i=0;i< NUM_TILES; i++){
            sum = arr[0][i] + arr[1][i] + arr[2][i]
            if(sum == 3){ return 1;}
            else if (sum == -3){return -1;}
        }

        // Check the diagonals
        sum = arr[0][0] + arr[1][1] + arr[2][2]
        if(sum == 3){ return 1;}
        else if (sum == -3){return -1;}

        sum = arr[2][0] + arr[1][1] + arr[0][2]
        if(sum == 3){ return 1;}
        else if (sum == -3){return -1;}

        //  There are no winners
        return 0;
    }

    const renderIcon =(row,col)=>{
        let value = gameState[row][col]
        switch(value){
            case 1: return <Image style={[styles.tileX,{tintColor:'#FFFFFF'}]} source={require('../../Assets/images/ic_close.png')} />;
            case -1: return <Image style={[styles.tileX,{tintColor:'#E6B905'}]} source={require('../../Assets/images/ic_round.png')} />;
            default: return <View />
        }
    }

    const onTilePress =(row,col)=>{
        //dont allow tile change 
        let value = gameState[row][col]
        if(value !== 0){
            return;
        }

        //current player 
        let current_player = currentPlayer

        //set current tile icon
        let arr = gameState.slice()
        arr[row][col] = current_player
        setGameState(arr)

        //turn to another player
        let next_player = (current_player == 1) ? -1 : 1
        setCurrentPlayer(next_player)

        //Check for winners
        var winner = setGameWinner();
        if(winner == 1){
            Alert.alert("Player one is the winner");
            initializeGame()
        }else if(winner == -1){
            Alert.alert("Player two is the winner");
            initializeGame()
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{marginBottom:40,fontSize:24,color:'#FFFFFF',fontWeight:'bold'}}>Tic Tac Toe</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={()=>{
                    onTilePress(0,0)
                }} style={styles.tile}>
                    {
                        renderIcon(0,0)
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    onTilePress(0,1)
                }} style={styles.tile}>
                    {
                        renderIcon(0,1)
                    }
                </TouchableOpacity><TouchableOpacity onPress={()=>{
                    onTilePress(0,2)
                }} style={styles.tile}>
                    {
                        renderIcon(0,2)
                    }
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={()=>{
                    onTilePress(1,0)
                }} style={styles.tile}>
                    {
                        renderIcon(1,0)
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    onTilePress(1,1)
                }} style={styles.tile}>
                    {
                        renderIcon(1,1)
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    onTilePress(1,2)
                }} style={styles.tile}>
                    {
                        renderIcon(1,2)
                    }
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={()=>{
                    onTilePress(2,0)
                }} style={styles.tile}>
                    {
                        renderIcon(2,0)
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    onTilePress(2,1)
                }} style={styles.tile}>
                    {
                        renderIcon(2,1)
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    onTilePress(2,2)
                }} style={styles.tile}>
                    {
                        renderIcon(2,2)
                    }
                </TouchableOpacity>
            </View>
            
            <TouchableWithoutFeedback onPress={()=> initializeGame()}>
                <View style={{height:40,width:200,backgroundColor:'#27AE61',marginTop:30,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,color:'#FFFFFF'}}>New Game</Text>
                </View>
            </TouchableWithoutFeedback>

            <Text style={{position:'absolute',bottom:30,color:'#FFF'}}>Powered by MsysTech</Text>
        </View>
    )
}

export default Main
