import React, { useState, useEffect, useCallback } from 'react';
import {
    Image as Minnowimag,
    TouchableOpacity,
    View as Netarviewder,
    TouchableOpacity as TimeTapOpacity,
    Text as Minnowtext,
    Share,
    Dimensions as Derdimensaryme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import inphaulbuts from '../MinnowMastersThePureHaulAssets/InpureData/inphaulbuts';
import fishrmnStories from '../MinnowMastersThePureHaulAssets/InpureData/fishrmnStories';

export default function FishermansStories({ activeVector, setActiveVector }: { activeVector: string, setActiveVector?: React.Dispatch<React.SetStateAction<string>> }) {
    const { width: purewit, height: pureht } = Derdimensaryme.get('window');

    // --- Розміри та радіуси ---
    const cardPadding = purewit * 0.06;
    const cardRadius = purewit * 0.08;
    const cardWidth = purewit * 0.88;
    const cardMarginTop = pureht * 0.07;

    const btnSize = purewit * 0.15;
    const btnGap = purewit * 0.06;
    const btnsMarginTop = pureht * 0.035;

    // --- State для поточної історії, збережених, та масиву історій для показу ---
    const [currentIdx, setCurrentIdx] = useState(0);
    const [saved, setSaved] = useState(false);
    const [savedStories, setSavedStories] = useState<any[]>([]);
    const [displayStories, setDisplayStories] = useState<any[]>([]);
    const [noSaved, setNoSaved] = useState(false);

    // --- Завантажити збережені історії ---
    useEffect(() => {
        AsyncStorage.getItem('savedStories').then(res => {
            let arr: any[] = [];
            if (res) arr = JSON.parse(res);
            setSavedStories(arr);

            if (activeVector === 'Saved Stories minnow') {
                if (arr.length === 0) {
                    setDisplayStories([]);
                    setNoSaved(true);
                } else {
                    setDisplayStories(arr);
                    setNoSaved(false);
                }
                setCurrentIdx(0);
            } else {
                setDisplayStories(fishrmnStories);
                setNoSaved(false);
                setCurrentIdx(0);
            }
        });
    }, [activeVector]);

    // --- Оновлювати saved при зміні історії або savedStories ---
    const story = displayStories[currentIdx];

    useEffect(() => {
        if (!story) {
            setSaved(false);
            return;
        }
        setSaved(savedStories.some((s: any) => s.id === story.id));
    }, [story, savedStories]);

    // --- Зберегти/видалити історію ---
    const toggleSave = useCallback(async () => {
        if (!story) return;
        const key = 'savedStories';
        let arr = [...savedStories];
        let newDisplayStories = displayStories;
        let newIdx = currentIdx;

        if (saved) {
            arr = arr.filter((s: any) => s.id !== story.id);

            // Якщо на вкладці збережених, одразу видаляємо з displayStories
            if (activeVector === 'Saved Stories minnow') {
                newDisplayStories = displayStories.filter((s: any, idx: number) => idx !== currentIdx);
                // Якщо видалили останню історію, показати "немає збережених"
                if (newDisplayStories.length === 0) {
                    setDisplayStories([]);
                    setNoSaved(true);
                    setCurrentIdx(0);
                } else {
                    // Якщо видалили не останню, залишити currentIdx в межах нового масиву
                    if (currentIdx >= newDisplayStories.length) {
                        newIdx = newDisplayStories.length - 1;
                    }
                    setDisplayStories(newDisplayStories);
                    setCurrentIdx(newIdx);
                }
            }
        } else {
            arr.push(story);
        }
        await AsyncStorage.setItem(key, JSON.stringify(arr));
        setSavedStories(arr);
    }, [saved, story, savedStories, activeVector, displayStories, currentIdx]);

    // --- Перевірка для неактивної кнопки next ---
    const isSavedStoriesPage = activeVector === 'Saved Stories minnow';
    const isNextDisabled = isSavedStoriesPage && displayStories.length === 1;

    // --- Перехід до наступної історії ---
    const goNext = useCallback(() => {
        if (!displayStories.length || isNextDisabled) return;
        setCurrentIdx(idx => (idx + 1) % displayStories.length);
    }, [displayStories, isNextDisabled]);

    // --- Share історії ---
    const shareStory = useCallback(() => {
        if (!story) return;
        Share.share({
            title: story.title,
            message: `${story.title}\n\n${story.text}`,
        });
    }, [story]);

    return (
        <Netarviewder style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-start',
        }}
        >
            {noSaved ? (
                <>
                    <Minnowtext
                        style={{
                            fontWeight: 'bold',
                            marginTop: pureht * 0.25,
                            color: '#222',
                            fontSize: purewit * 0.05,
                            textAlign: 'center',
                        }}
                    >
                        You don`t have any saved stories
                    </Minnowtext>
                    <TimeTapOpacity style={{
                        alignItems: 'center',
                        marginTop: pureht * 0.04,
                        marginVertical: pureht * 0.005,
                    }}
                        onPress={() => setActiveVector && setActiveVector('Fishermans Stories About Sea')}
                    >
                        <Minnowimag
                            source={inphaulbuts.gotostories}
                            style={{
                                width: purewit * 0.5,
                                height: pureht * 0.1,
                            }}
                            resizeMode="contain"
                        />
                    </TimeTapOpacity>
                </>
            ) : story ? (
                <>
                    {/* Card */}
                    <Netarviewder
                        style={{
                            elevation: 4,
                            shadowOpacity: 0.12,
                            width: cardWidth,
                            borderRadius: cardRadius,
                            padding: cardPadding,
                            backgroundColor: '#FFF59D',
                            marginTop: cardMarginTop,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                            shadowColor: '#000',
                        }}
                    >
                        <Minnowtext style={{
                            color: '#222',
                            fontWeight: 'bold',
                            marginBottom: pureht * 0.018,
                            fontSize: purewit * 0.055,
                        }}
                        >
                            {story.title}
                        </Minnowtext>
                        <Minnowtext
                            style={{
                                fontWeight: '500',
                                fontSize: purewit * 0.042,
                                color: '#222',
                                lineHeight: purewit * 0.062,
                            }}
                        >
                            {story.text}
                        </Minnowtext>
                    </Netarviewder>

                    {/* Кнопки */}
                    <Netarviewder
                        style={{
                            marginTop: btnsMarginTop,
                            gap: btnGap,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        {/* Ліва кнопка */}
                        <TouchableOpacity onPress={shareStory}>
                            <Minnowimag
                                source={inphaulbuts.share}
                                style={{
                                    width: btnSize,
                                    height: btnSize,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                        {/* Центральна кнопка */}
                        <TouchableOpacity
                            onPress={goNext}
                            disabled={isNextDisabled}
                            style={{
                                opacity: isNextDisabled ? 0 : 1,
                            }}
                        >
                            <Minnowimag
                                source={inphaulbuts.next}
                                style={{
                                    width: btnSize * 2.5,
                                    height: btnSize,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                        {/* Права кнопка */}
                        <TouchableOpacity onPress={toggleSave}>
                            <Minnowimag
                                source={saved ? inphaulbuts.saved : inphaulbuts.unsaved}
                                style={{
                                    width: btnSize,
                                    height: btnSize,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                    </Netarviewder>
                    <Minnowimag
                        source={require('../MinnowMastersThePureHaulAssets/MinnowMastersThePureHaulImages/fisherman.png')}
                        style={{
                            bottom: pureht * 0.03,
                            width: purewit * 0.8,
                            height: purewit * 0.8,
                            resizeMode: 'contain',
                            position: 'absolute',
                            right: -purewit * 0.08,
                        }}
                    />
                </>
            ) : null}
        </Netarviewder>
    );
}