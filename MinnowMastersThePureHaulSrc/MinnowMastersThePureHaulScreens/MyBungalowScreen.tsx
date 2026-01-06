import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    Dimensions as Demurehansion,
    Image as Nowimage,
    Modal,
    Text as Nurealtext,
    TouchableOpacity as HaurehtTapper,
    View as Mstrthersurview,
} from 'react-native';

// --- Константи для предметів ---
const ITEMS = [
    {
        key: 'bungalow_item_1',
        name: 'Lantern',
        image: require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/items/flashlight.png'),
        top: 64,
        left: 66,
        size: 0.18, // 18% of screen width
    },
    {
        key: 'bungalow_item_2',
        name: 'Chair',
        image: require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/items/chair.png'),
        top: 77,
        left: 3,
        size: 0.35,
    },
    {
        key: 'bungalow_item_3',
        name: 'Table',
        image: require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/items/fishingRod.png'),
        top: 75,
        left: 25,
        size: 0.25,
    },
    {
        key: 'bungalow_item_4',
        name: 'Plant',
        image: require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/items/boat.png'),
        top: 70,
        left: 84,
        size: 0.22,
    },
];
const FISH_KEY = 'fish_count';
const ITEM_COST = 30;

export default function MyBungalowScreen() {
    const { width: purewit, height: pureht } = Demurehansion.get('window');

    // --- State ---
    const [fish, setFish] = useState(0);
    const [items, setItems] = useState([false, false, false, false]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [error, setError] = useState('');

    // --- Завантаження даних ---
    useEffect(() => {
        (async () => {
            const fishVal = await AsyncStorage.getItem(FISH_KEY);
            setFish(fishVal ? parseInt(fishVal, 10) : 0);

            const loaded = await Promise.all(
                ITEMS.map(async item => {
                    const val = await AsyncStorage.getItem(item.key);
                    return val === '1';
                })
            );
            setItems(loaded);
        })();
    }, []);

    // --- Оновити предмет після покупки ---
    const handleBuy = async () => {
        if (selectedIdx === null) return;
        setError('');
        if (fish < ITEM_COST) {
            setError('Not enough fish!');
            return;
        }
        // Відмічаємо предмет як куплений
        const newItems = [...items];
        newItems[selectedIdx] = true;
        setItems(newItems);
        await AsyncStorage.setItem(ITEMS[selectedIdx].key, '1');
        // Віднімаємо рибки
        const newFish = fish - ITEM_COST;
        setFish(newFish);
        await AsyncStorage.setItem(FISH_KEY, newFish.toString());
        setModalVisible(false);
        setSelectedIdx(null);
    };

    // --- Відкрити модалку ---
    const openModal = (idx: number) => {
        setSelectedIdx(idx);
        setError('');
        setModalVisible(true);
    };

    // --- Закрити модалку ---
    const closeModal = () => {
        setModalVisible(false);
        setSelectedIdx(null);
        setError('');
    };

    // --- Розмір плюсика (однаковий для всіх) ---
    const plusSize = purewit * 0.14;

    // --- UI ---
    return (
        <Mstrthersurview style={{ flex: 1, alignItems: 'center', }}>
            {/* Лічильник рибок */}
            <Mstrthersurview
                style={{
                    paddingVertical: pureht * 0.008,
                    backgroundColor: '#fff',
                    right: purewit * 0.06,
                    top: pureht * 0.045,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: purewit * 0.04,
                    borderWidth: 3,
                    borderColor: '#FFD600',
                    paddingHorizontal: purewit * 0.04,
                    zIndex: 10,
                    position: 'absolute',
                }}
            >
                <Nurealtext style={{
                    color: '#222',
                    marginRight: purewit * 0.02,
                    fontSize: purewit * 0.055,
                    fontWeight: '700',
                }}
                >
                    {fish}
                </Nurealtext>
                <Nowimage
                    source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/fish.png')}
                    style={{
                        marginTop: 2,
                        height: purewit * 0.09,
                        width: purewit * 0.09,
                    }}
                    resizeMode="contain"
                />
            </Mstrthersurview>

            {/* Плюсики/предмети */}
            {ITEMS.map((item, idx) =>
                !items[idx] ? (
                    <HaurehtTapper
                        key={idx}
                        style={{
                            width: plusSize,
                            borderWidth: 3,
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            height: plusSize,
                            backgroundColor: '#92C8EB',
                            borderRadius: purewit * 0.03,
                            zIndex: 5,
                            borderColor: '#222',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                        }}
                        activeOpacity={0.7}
                        onPress={() => openModal(idx)}
                    >
                        <Nurealtext style={{
                            fontSize: plusSize * 0.7,
                            color: '#222',
                            textAlign: 'center',
                            fontWeight: '400',
                        }}
                        >
                            +
                        </Nurealtext>
                    </HaurehtTapper>
                ) : (
                    <Nowimage
                        key={idx}
                        source={item.image}
                        style={{
                            left: `${item.left}%`,
                            position: 'absolute',
                            zIndex: 5,
                            width: purewit * item.size,
                            height: purewit * item.size,
                            top: `${item.top}%`,
                        }}
                        resizeMode="contain"
                    />
                )
            )}

            {/* Модалка покупки */}
            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent
                onRequestClose={closeModal}
            >
                <Mstrthersurview style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.22)',
                    flex: 1,
                    justifyContent: 'center',
                }}
                >
                    <Mstrthersurview
                        style={{
                            borderWidth: 4,
                            borderRadius: purewit * 0.06,
                            alignItems: 'center',
                            borderColor: '#FAAF04',
                            width: purewit * 0.8,
                            padding: purewit * 0.07,
                            backgroundColor: '#E3F0FF',
                        }}
                    >
                        <Nurealtext style={{
                                color: '#222',
                                textAlign: 'center',
                                fontWeight: '700',
                                marginBottom: pureht * 0.01,
                                fontSize: purewit * 0.05,
                            }}
                        >
                            Exchange for:
                        </Nurealtext>
                        <Mstrthersurview
                            style={{
                                marginBottom: pureht * 0.01,
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Nurealtext
                                style={{
                                    marginRight: purewit * 0.01,
                                    color: '#222',
                                    fontSize: purewit * 0.05,
                                    fontWeight: '700',
                                }}
                                >
                                x{ITEM_COST}
                            </Nurealtext>
                            <Nowimage
                                source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/fish.png')}
                                style={{
                                    width: purewit * 0.11,
                                    height: purewit * 0.11,
                                }}
                                resizeMode="contain"
                            />
                        </Mstrthersurview>
                        {error ? (
                            <Nurealtext
                                style={{
                                    color: 'red',
                                    fontSize: purewit * 0.045,
                                    marginBottom: pureht * 0.01,
                                }}
                            >
                                {error}
                            </Nurealtext>
                        ) : null}
                        <Mstrthersurview
                            style={{
                                flexDirection: 'row',
                                marginTop: pureht * 0.01,
                                gap: purewit * 0.06,
                            }}
                        >
                            <HaurehtTapper
                                style={{
                                    marginRight: purewit * 0.03,
                                    paddingHorizontal: purewit * 0.09,
                                    paddingVertical: pureht * 0.012,
                                    backgroundColor: '#FF9800',
                                    borderRadius: purewit * 0.03,
                                }}
                                onPress={closeModal}
                                activeOpacity={0.7}
                            >
                                <Nurealtext
                                    style={{
                                        fontWeight: '700',
                                        fontSize: purewit * 0.06,
                                        color: '#222',
                                    }}
                                >
                                    No
                                </Nurealtext>
                            </HaurehtTapper>
                            <HaurehtTapper
                                style={{
                                    paddingVertical: pureht * 0.012,
                                    borderRadius: purewit * 0.03,
                                    paddingHorizontal: purewit * 0.09,
                                    backgroundColor: '#8BC34A',
                                }}
                                onPress={handleBuy}
                                activeOpacity={0.7}
                            >
                                <Nurealtext
                                    style={{
                                        fontWeight: '700',
                                        fontSize: purewit * 0.06,
                                        color: '#222',
                                    }}
                                >
                                    Yes
                                </Nurealtext>
                            </HaurehtTapper>
                        </Mstrthersurview>
                        {/* Хрестик закрити */}
                        <HaurehtTapper
                            style={{
                                position: 'absolute',
                                top: purewit * 0.01,
                                right: purewit * 0.05,
                                zIndex: 10,
                            }}
                            onPress={closeModal}
                        >
                            <Nurealtext
                                style={{
                                    fontSize: purewit * 0.1,
                                    color: '#222',
                                }}
                            >
                                ×
                            </Nurealtext>
                        </HaurehtTapper>
                    </Mstrthersurview>
                </Mstrthersurview>
            </Modal>
        </Mstrthersurview>
    );
}