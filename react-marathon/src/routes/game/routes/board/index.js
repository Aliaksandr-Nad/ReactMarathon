import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom"

import {PokemonContext} from "../../../../context/pokemonContext";

import PokemonCard from "../../../../components/pokemonCard";
import PlayerBoard from "./component/playerBoard";

import s from './style.module.css';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if (item.card.possession === 'blue') {
            player1Count++;
        }

        if (item.card.possession === 'red') {
            player2Count++;
        }
    })

    return [player1Count, player2Count];
}

const BoardPage = () => {
    const {player1Pokemons, onEnemyPokemons, setGameResult} = useContext(PokemonContext);

    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(player1Pokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))
    });
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState([null]);
    const [steps, setSteps] = useState(0);

    useEffect(async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);

        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const player2Request = await player2Response.json();
        setPlayer2(() => {
            return player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            }))
        });
        onEnemyPokemons(player2Request.data);
    }, []);

    const handlerClickBoardPlate = async (position) => {
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            };

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            const request = await res.json();

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            setBoard(request.data);
            setSteps(prevStep => {
                return prevStep + 1;
            })
        }
    }

    const history = useHistory();
    if (player1Pokemons.length === 0) {
        history.replace('/game');
    }

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player2, player2);

            if (count1 > count2){
                setGameResult('WIN');
            } else if(count1 < count2){
                setGameResult('LOSE');
            }else {
                setGameResult('DRAW');
            }

            history.replace('/game/finish');
        }
    }, [steps]);

    return (
        <div className={s.root}>
            <PlayerBoard
                wrapper={s.playerOne}
                player={1}
                cards={player1}
                onClickCard={(card) => setChoiceCard(card)}
            />
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handlerClickBoardPlate(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize/>
                            }
                        </div>
                    ))
                }
            </div>
            <PlayerBoard
                wrapper={s.playerTwo}
                player={2}
                cards={player2}
                onClickCard={(card) => setChoiceCard(card)}
            />
        </div>
    );
};

export default BoardPage;
