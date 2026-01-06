import React, { useEffect, useState } from 'react';
import {
    Dimensions as Dinnowmens,
    Image as Purimage,
    View as Puthesterview,
    Text as Haustamwtext,
    TouchableOpacity as TheOpacityTouchable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themaspurefontsnow } from '../themaspurefontsnow';

// --- Константи ---
const LEVELS_COUNT = 8;
const FISH_KEY = 'fish_count';
const PROGRESS_KEY = 'game_levels_progress';

const levelColors = {
    completed: '#094A03',
    current: '#031F4A',
    locked: '#005362',
};

// --- Опис малюнків для кожного рівня (індекси активних клітинок) ---
const LEVEL_SHAPES: number[][] = [
    // Level 1 (5 cells, cross)
    [1, 3, 4, 5, 7],
    // Level 2 (8 cells, "H")
    [0, 2, 3, 4, 5, 6, 8, 10],
    // Level 3 (9 cells, square)
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    // Level 4 (9 cells, "T")
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    // Level 5 (5 cells, vertical line)
    [1, 4, 7, 10, 13],
    // Level 6 (13 cells, diamond)
    [3, 4, 5, 7, 8, 9, 11, 12, 13, 15, 16, 17, 19],
    // Level 7 (16 cells, big square)
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    // Level 8 (13 cells, cross with arms)
    [1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15, 16, 17],
];

// --- Розміри сітки для кожного рівня ---
const LEVEL_GRIDS = [
    { rows: 5, cols: 3 }, // Level 1
    { rows: 4, cols: 3 }, // Level 2
    { rows: 3, cols: 3 }, // Level 3
    { rows: 5, cols: 3 }, // Level 4
    { rows: 5, cols: 3 }, // Level 5
    { rows: 5, cols: 5 }, // Level 6
    { rows: 4, cols: 4 }, // Level 7
    { rows: 5, cols: 5 }, // Level 8
];

// --- Данні для рівнів (рандомне сміття: 1 або 2 у випадкових клітинках) ---
function generateLevel(level: number) {
    const shape = LEVEL_SHAPES[level - 1];
    const grid = LEVEL_GRIDS[level - 1];
    const totalTiles = grid.rows * grid.cols;
    let tiles = Array(totalTiles).fill(null);

    // Активні клітинки — рибки
    shape.forEach(idx => {
        tiles[idx] = 'fish';
    });

    // Визначаємо кількість сміття: 1 або 2
    const trashCount = Math.random() < 0.5 ? 1 : 2;
    // Випадкові унікальні індекси для сміття серед активних клітинок
    const activeIndexes = [...shape];
    const trashIndexes: number[] = [];
    while (trashIndexes.length < trashCount && activeIndexes.length > 0) {
        const randIdx = Math.floor(Math.random() * activeIndexes.length);
        const idx = activeIndexes.splice(randIdx, 1)[0];
        trashIndexes.push(idx);
    }
    trashIndexes.forEach(idx => {
        tiles[idx] = 'trash';
    });

    return { tiles, grid };
}

export default function TheHaunostersGamestrs() {
    const { width: purewit, height: pureht } = Dinnowmens.get('window');

    // --- State ---
    const [progress, setProgress] = useState(1);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [fish, setFish] = useState(0);

    // --- Game state ---
    const [tiles, setTiles] = useState<string[]>([]);
    const [opened, setOpened] = useState<boolean[]>([]);
    const [gameOver, setGameOver] = useState<'win' | 'lose' | null>(null);
    const [grid, setGrid] = useState<{ rows: number; cols: number }>({ rows: 3, cols: 3 });

    // --- Завантаження прогресу та рибок ---
    useEffect(() => {
        const loadData = async () => {
            const fishVal = await AsyncStorage.getItem(FISH_KEY);
            setFish(fishVal && !isNaN(Number(fishVal)) ? parseInt(fishVal, 10) : 0);

            const progressVal = await AsyncStorage.getItem(PROGRESS_KEY);
            setProgress(progressVal && !isNaN(Number(progressVal)) ? parseInt(progressVal, 10) : 1);
        };
        loadData();

        // Додаємо підписку на фокус, щоб оновлювати fish при поверненні на екран
        const focusListener = () => loadData();
        // @ts-ignore
        if (typeof window !== 'undefined' && window.addEventListener) {
            window.addEventListener('focus', focusListener);
            return () => window.removeEventListener('focus', focusListener);
        }
    }, []);

    // --- Оновлювати fish після виграшу ---
    useEffect(() => {
        if (!gameStarted && gameOver === null) {
            (async () => {
                const fishVal = await AsyncStorage.getItem(FISH_KEY);
                setFish(fishVal && !isNaN(Number(fishVal)) ? parseInt(fishVal, 10) : 0);
            })();
        }
    }, [gameStarted, gameOver]);

    // --- Почати гру ---
    const startGame = () => {
        if (selectedLevel === null) return;
        setGameStarted(true);
        setGameOver(null);
        const { tiles: levelTiles, grid: levelGrid } = generateLevel(selectedLevel);
        setTiles(levelTiles);
        setGrid(levelGrid);
        setOpened(Array(levelTiles.length).fill(false));
    };

    // --- Відкрити плитку ---
    const openTile = async (idx: number) => {
        if (opened[idx] || gameOver || !tiles[idx]) return;
        const newOpened = [...opened];
        newOpened[idx] = true;
        setOpened(newOpened);

        // Якщо рибка — одразу додаємо рибку
        if (tiles[idx] === 'fish') {
            const newFish = fish + 1;
            setFish(newFish);
            await AsyncStorage.setItem(FISH_KEY, newFish.toString());
            console.log('[MinnowMasters] +1 fish, total:', newFish);
        }

        // Якщо сміття — програш
        if (tiles[idx] === 'trash') {
            setGameOver('lose');
            setTimeout(() => {
                setGameStarted(false);
                setGameOver(null);
            }, 1200);
            return;
        }

        // Якщо всі рибки відкриті (без сміття) — перемога
        const fishTiles = tiles.map((t, i) => t === 'fish' && newOpened[i]);
        const allFishOpened = fishTiles.filter(Boolean).length === tiles.filter(t => t === 'fish').length;
        if (allFishOpened) {
            setGameOver('win');
            // Додаємо 15 рибок за перемогу
            const winFish = fish + 15;
            setFish(winFish);
            await AsyncStorage.setItem(FISH_KEY, winFish.toString());
            console.log('[MinnowMasters] +15 fish for win, total:', winFish);
            // Оновити прогрес
            if (selectedLevel === progress && progress < LEVELS_COUNT) {
                const newProgress = progress + 1;
                setProgress(newProgress);
                await AsyncStorage.setItem(PROGRESS_KEY, newProgress.toString());
            }
            setTimeout(() => {
                setGameStarted(false);
                setGameOver(null);
            }, 1200);
        }
    };

    // --- Розміри для плиток ---
    const gridPadding = pureht * 0.08;
    const tileGap = purewit * 0.04;
    const tileSize = Math.min(
        (purewit * 0.8 - tileGap * (grid.cols + 1)) / grid.cols,
        (pureht * 0.6 - tileGap * (grid.rows + 1)) / grid.rows
    );

    // --- Картинки ---
    const tileBg = require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/tile_bg.png');
    const tileFish = require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/tile_fish.png');
    const tileTrash = require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/tile_trash.png');
    const logoImg = require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/logoload.png');

    // --- Екран вибору рівня ---
    if (!gameStarted) {
        return (
            <Puthesterview style={{
                justifyContent: 'flex-start',
                flex: 1,
                alignItems: 'center',
            }}
            >
                {/* Сітка рівнів */}
                <Puthesterview style={{ marginBottom: pureht * 0.04, marginTop: pureht * 0.09 }}>
                    <Puthesterview
                        style={{
                            justifyContent: 'center',
                            marginBottom: tileGap,
                            flexDirection: 'row',
                        }}
                    >
                        {[1, 2, 3].map(lvl => (
                            <TheOpacityTouchable
                                onPress={() => setSelectedLevel(lvl)}
                                disabled={lvl > progress}
                                key={lvl}
                                style={{
                                    width: tileSize,
                                    height: tileSize,
                                    marginHorizontal: tileGap / 2,
                                    borderRadius: tileSize * 0.18,
                                    backgroundColor:
                                        lvl < progress
                                            ? levelColors.completed
                                            : lvl === progress
                                                ? levelColors.current
                                                : levelColors.locked,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: selectedLevel === lvl ? 4 : 0,
                                    borderColor: selectedLevel === lvl ? '#FFD600' : undefined,
                                }}
                            >
                                <Haustamwtext
                                    style={{
                                        fontFamily: themaspurefontsnow.bold,
                                        fontSize: tileSize * 0.38,
                                        color: '#fff',
                                    }}
                                >
                                    {lvl}
                                </Haustamwtext>
                            </TheOpacityTouchable>
                        ))}
                    </Puthesterview>
                    <Puthesterview style={{
                        marginBottom: tileGap,
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                    >
                        {[4, 5, 6].map(lvl => (
                            <TheOpacityTouchable
                                key={lvl}
                                onPress={() => setSelectedLevel(lvl)}
                                style={{
                                    width: tileSize,
                                    height: tileSize,
                                    marginHorizontal: tileGap / 2,
                                    borderRadius: tileSize * 0.18,
                                    backgroundColor:
                                        lvl < progress
                                            ? levelColors.completed
                                            : lvl === progress
                                                ? levelColors.current
                                                : levelColors.locked,
                                    borderWidth: selectedLevel === lvl ? 4 : 0,
                                    alignItems: 'center',
                                    borderColor: selectedLevel === lvl ? '#FFD600' : undefined,
                                    justifyContent: 'center',
                                }}
                                disabled={lvl > progress}
                            >
                                <Haustamwtext
                                    style={{
                                        color: '#fff',
                                        fontSize: tileSize * 0.38,
                                        fontFamily: themaspurefontsnow.bold,
                                    }}
                                >
                                    {lvl}
                                </Haustamwtext>
                            </TheOpacityTouchable>
                        ))}
                    </Puthesterview>
                    <Puthesterview
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        {[7, 8].map(lvl => (
                            <TheOpacityTouchable
                                key={lvl}
                                disabled={lvl > progress}
                                onPress={() => setSelectedLevel(lvl)}
                                style={{
                                    width: tileSize,
                                    borderRadius: tileSize * 0.18,
                                    marginHorizontal: tileGap / 2,
                                    height: tileSize,
                                    borderWidth: selectedLevel === lvl ? 4 : 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor:
                                        lvl < progress
                                            ? levelColors.completed
                                            : lvl === progress
                                                ? levelColors.current
                                                : levelColors.locked,
                                    borderColor: selectedLevel === lvl ? '#FFD600' : undefined,
                                }}
                            >
                                <Haustamwtext
                                    style={{
                                        fontFamily: themaspurefontsnow.bold,
                                        fontSize: tileSize * 0.38,
                                        color: '#fff',
                                    }}
                                >
                                    {lvl}
                                </Haustamwtext>
                            </TheOpacityTouchable>
                        ))}
                    </Puthesterview>
                </Puthesterview>
                {/* Кнопка PLAY */}
                <TheOpacityTouchable
                    disabled={selectedLevel === null}
                    onPress={startGame}
                    style={{
                        shadowOffset: { width: 0, height: 2 },
                        width: purewit * 0.7,
                        height: pureht * 0.07,
                        elevation: 3,
                        backgroundColor: '#FFC107',
                        alignItems: 'center',
                        marginBottom: pureht * 0.04,
                        borderRadius: tileSize * 0.18,
                        opacity: selectedLevel === null ? 0.5 : 1,
                        shadowColor: '#000',
                        shadowOpacity: 0.15,
                        shadowRadius: 6,
                        justifyContent: 'center',
                    }}
                >
                    <Haustamwtext
                        style={{
                            color: '#031F4A',
                            fontFamily: themaspurefontsnow.bold,
                            fontSize: purewit * 0.07,
                        }}
                    >
                        PLAY
                    </Haustamwtext>
                    <Haustamwtext
                        style={{
                            fontSize: purewit * 0.045,
                            marginTop: -pureht * 0.01,
                            color: '#031F4A',
                            fontFamily: themaspurefontsnow.bold,
                        }}
                    >
                        {selectedLevel !== null ? `LEVEL ${selectedLevel}` : ''}
                    </Haustamwtext>
                </TheOpacityTouchable>
                {/* Лого */}
                <Purimage
                    source={logoImg}
                    style={{
                        marginTop: pureht * 0.01,
                        width: purewit * 0.7,
                        height: pureht * 0.18,
                    }}
                    resizeMode="contain"
                />
            </Puthesterview>
        );
    }

    // --- Екран гри ---
    return (
        <Puthesterview
            style={{
                justifyContent: 'flex-start',
                flex: 1,
                backgroundColor: '#1b7dc6',
                alignItems: 'center',
            }}
        >
            {/* Сітка гри */}
            <Puthesterview
                style={{
                    marginTop: gridPadding,
                    marginBottom: pureht * 0.04,
                }}
            >
                {Array.from({ length: grid.rows }).map((_, row) => (
                    <Puthesterview key={row} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: tileGap }}>
                        {Array.from({ length: grid.cols }).map((_, col) => {
                            const idx = row * grid.cols + col;
                            const isActive = tiles[idx] !== null;
                            const isOpened = opened[idx];
                            let tileImg = tileBg;
                            if (isOpened && isActive) {
                                if (tiles[idx] === 'fish') tileImg = tileFish;
                                if (tiles[idx] === 'trash') tileImg = tileTrash;
                            }
                            let tileBgColor = undefined;
                            if (gameOver === 'win' && isOpened && tiles[idx] === 'fish') tileBgColor = '#FFD600';
                            if (gameOver === 'lose' && isOpened && tiles[idx] === 'trash') tileBgColor = '#FFD600';

                            return isActive ? (
                                <TheOpacityTouchable
                                    key={idx}
                                    disabled={isOpened || gameOver !== null}
                                    onPress={() => openTile(idx)}
                                    style={{
                                        width: tileSize,
                                        marginHorizontal: tileGap / 2,
                                        alignItems: 'center',
                                        borderRadius: tileSize * 0.18,
                                        height: tileSize,
                                        shadowRadius: 6,
                                        backgroundColor: tileBgColor,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.12,
                                        justifyContent: 'center',
                                        elevation: 2,
                                        shadowColor: '#000',
                                    }}
                                >
                                    <Purimage
                                        source={tileImg}
                                        style={{
                                            width: tileSize * 0.92,
                                            height: tileSize * 0.92,
                                        }}
                                        resizeMode="contain"
                                    />
                                </TheOpacityTouchable>
                            ) : (
                                <Puthesterview
                                    key={idx}
                                    style={{
                                        backgroundColor: 'transparent',
                                        height: tileSize,
                                        width: tileSize,
                                        borderRadius: tileSize * 0.18,
                                        marginHorizontal: tileGap / 2,
                                    }}
                                />
                            );
                        })}
                    </Puthesterview>
                ))}
            </Puthesterview>
            {/* Лого */}
            <Purimage
                source={logoImg}
                style={{
                    bottom: pureht * 0.025,
                    height: pureht * 0.18,
                    alignSelf: 'center',
                    position: 'absolute',
                    width: purewit * 0.7,
                }}
                resizeMode="contain"
            />
        </Puthesterview>
    );
}