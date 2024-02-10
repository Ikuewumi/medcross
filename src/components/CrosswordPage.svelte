<script lang="ts">
    import {
        CrossWord as C,
        type Cross,
        type CrossFull,
        type Word,
    } from "../composables/engine";
    import { decodeString } from "../composables/text";
    import Modal from "./utilities/Modal.svelte";
    import {
        coinCount,
        costs,
        currentWord,
        gameOngoing,
    } from "../composables/store";
    import GameBar from "./utilities/GameBar.svelte";
    import GermanMode from "../components/german/GermanMode.svelte";
    import CrosswordClassic from "./crossword/CrosswordClassic.svelte";
    import { enterMsg } from "../composables/toast";
    import { sleep } from "../composables/utilities";
    import GameEnded from "./utilities/GameEnded.svelte";
    import { onMount } from "svelte";

    const ids = ["#crossword-page", "header"];

    gameOngoing.subscribe((state) => {
        ids.map((id) => {
            const el = document.querySelector(id);
            if (state) {
                el?.classList.add("ongoing");
            } else {
                el?.classList.remove("ongoing");
            }
        });
    });

    /**
     * The User Data as an encoded string
     */
    export let enc = "";
    let data: Cross;
    let userAnswers: Word[] = [];
    let gameEndedModal = false;
    let confirmModal = false;
    const modes = ["trivia", "classic"] as const;
    type GameMode = (typeof modes)[number];
    let selectedMode: GameMode = "trivia";

    const updateUI = async () => {
        const urlId = window.location.pathname;
        const db = await window.getDb()
        const ans = await db.get('userAnswers', urlId)
        if (ans?.urlId && Array.isArray(ans?.words)) {
            userAnswers = ans.words
        }

    }

    onMount(() => {
        $gameOngoing = false;
        gameEndedModal = false;
        confirmModal = false;
        updateUI()
        console.log('mounted');
    })

    const openConfirmModal = () => (confirmModal = true);
    const closeConfirmModal = () => (confirmModal = false);
    let progress: number = 0;

    $: {
        progress = Math.floor((userAnswers.length / data.words.length) * 100);

    }

    $: {
        data = JSON.parse(decodeString(enc));
    }

    const calcColor = (progress: number) => {
        let clr = `var(--clr-grey-400)`;
        if (progress > 0 && progress < 100) {clr = `hsl(47, 80%, 35%)` }

        return clr
    }

    const startGame = () => {
        closeConfirmModal();
        if (userAnswers.length === data.words.length) {
            userAnswers = [];
        }
        $gameOngoing = true;
    };

    const endGame = () => {
        $gameOngoing = false;
    };

    const changeUserAnswers = (e: CustomEvent<Word[]>) => {
        userAnswers = e.detail;
        if (userAnswers.length) {
            const urlId = window.location.pathname;

            window
                .getDb()
                .then((db) => {
                    return db.put("userAnswers", {
                        urlId,
                        words: userAnswers 
                    });
                })
                .catch((e: Error) => {
                    enterMsg(
                        e?.message || "Something went wrong",
                        "failure",
                        10000,
                    );
                });
        }
    };

    const revealWord = async () => {
        if (userAnswers.length === data.words.length)
            return enterMsg(`game completed`, `failure`);
        if ($coinCount < costs.revealWord)
            return enterMsg(`coins are not sufficient`, `failure`);
        const coin = $coinCount - costs.revealWord;
        if (coin < 0)
            return (
                enterMsg(`coins are not sufficient`, `failure`),
                console.log(coin)
            );

        $coinCount = coin;
        await sleep(0);
        console.log($coinCount);
        enterMsg(
            `${$currentWord.word} has been revealed for ${costs.revealWord} coins`,
            `success`,
            4000,
        );
    };

    const finishGame = async () => {
        try {
            gameEndedModal = true;
            const urlId = window.location.pathname;
            const db = await window.getDb();
            const ans = await db.get("settings", "completed");
            const completedAnswers = (ans?.id === "completed" && Array.isArray(ans?.crosswords)) ? ans : {
                crosswords: [],
                id: "completed"
            };
            const newCompletedAnswers = new Set([...completedAnswers.crosswords, urlId]);
            await db.put("userAnswers", {
                urlId,
                words: []
            });
            await db.put(
                "settings",
                {
                    "id": "completed",
                    "crosswords": Array.from(newCompletedAnswers)
                }
            );

            updateUI()
        } catch (e) {
            enterMsg(String(e), `failure`, 3000);
        }
    };

    const closeEndGameModal = () => {
        endGame();
        gameEndedModal = false;
    };

</script>

{#if data?.words.length > 1 && data?.size > 1}
<button class="play" on:click={openConfirmModal} id="play-btn">
    <svg viewBox="0 0 24 24"><use href="#play"></use></svg>
    <span>Play</span>
</button>

<span id="user-done" title="Progress of The Crossword" style="--progress: {progress}">
    <span class="sr-only">{progress}% done</span>
</span>

<Modal open={confirmModal} title="Play Mode">
    <form on:submit|preventDefault>
                <div class="field">
                    <label for="gameMode">Choose The Game Mode</label>
                    <select name="mode" id="gameMode" bind:value={selectedMode}>
                        {#each modes as mode, i (i)}
                            <option value={mode}>{mode}</option>
                        {/each}
                    </select>
                    <blockquote>
                        {#if selectedMode === "trivia"}
                            <strong>Trivia Trail: </strong>
                            Unleash your inner quizmaster! Solve word clues and uncover
                            trivia tidbits in this unique crossword twist.
                        {:else}
                            <strong>Classic Crossword: </strong>
                            Timeless wordplay awaits! Solve clues, fill the grid, and
                            embrace the traditional joy of crosswords.
                        {/if}
                    </blockquote>
                </div>

                <div class="button-bar">
                    <button title="Close" on:click={closeConfirmModal}>Close</button
                    >
                    <button title="Start" on:click={startGame}>Start</button>
                </div>
            </form>
</Modal>

    {#if $gameOngoing}
        <GameBar on:close-game={endGame} on:reveal-word={revealWord}>
            {#if selectedMode === "trivia"}
                <GermanMode
                    data={{
                        size: data.size,
                        words: data.words,
                    }}
                    {userAnswers}
                    on:add-answer={changeUserAnswers}
                    on:game-finished={finishGame}
                />
            {:else if selectedMode === "classic"}
                <CrosswordClassic
                    data={{
                        size: data.size,
                        words: data.words,
                    }}
                    {userAnswers}
                    on:add-answer={changeUserAnswers}
                    on:game-finished={finishGame}
                />
            {/if}

            <GameEnded
                coinGain={4}
                wordCount={data.words.length}
                open={gameEndedModal}
                on:close-modal={closeEndGameModal}
            />
        </GameBar>
    {/if}
{/if}

<style lang="scss">
    button.play {
        --_padding: 0;
        --_icon-size: 3.75rem;
        --_icon-clr: var(--clr-grey-800);
        --_icon-bg: var(--clr-grey-400);
        --_gap: 0.15rem;
        --_bg: var(--clr-grey-900);
        --_clr: var(--clr-grey-400);

        grid-column: content;
        border-radius: var(--radius);
        margin-inline-start: auto;
        overflow: hidden;
        font-size: var(--step-2);
        font-weight: 700;
        text-transform: uppercase;
        box-shadow: var(--shadow-elevation-low);
        outline-color: currentColor;
        outline-offset: 4px;
        transition: 300ms ease-out box-shadow;

        &:hover {
            --_bg: var(--clr-grey-400);
            --_clr: var(--clr-grey-900);
            --_icon-clr: var(--clr-grey-400);
            --_icon-bg: var(--clr-white);
            box-shadow: var(--shadow-elevation-medium);
        }

        svg {
            width: var(--_icon-size);
            background: var(--_icon-bg);
            color: var(--_icon-clr);
        }

        span {
            padding-inline: 1.5rem 2rem;
        }
    }

    form {
        display: grid;
        gap: 1.5rem;
    }

    blockquote {
        margin-top: 0.25rem;
        border-radius: calc(var(--radius) / 2);
        gap: 0.25rem;
    }

    .field {
        display: grid;
        gap: 0.5rem;
    }

    select {
        appearance: auto;
    }

    .button-bar {
        margin-top: 0.5rem;
        margin-inline-start: auto;

        button {
            --_padding: 0.5rem 1.5rem;
            // --_border: 2px solid currentColor;
            border-radius: var(--radius);
            outline-offset: -8px;
            text-transform: uppercase;
            font-size: var(--step-1);
            font-weight: 700;
            box-shadow: 0 0 4px -1px var(--clr-grey-400);

            &[title^="Close"] {
                --_bg: transparent;
                --_clr: var(--clr-grey-400);
            }

            &[title^="Start"] {
                --_bg: var(--clr-grey-400);
                --_clr: var(--clr-grey-800);
            }
        }
    }


    span#user-done {
        --offset: 0.5rem;
        --bg: hsla(105, 39%, 39%, 0.552);
        --clr: var(--clr-grey-900);
        --width: 60px;
        cursor: pointer;
        grid-column: content;
        grid-row: 1 / 2; // Has the same grid-row value as the figure to stack them
        justify-self: end;
        background-color: #00000010;
        position: relative;
        margin: var(--offset) var(--offset) 0 0;
        width: var(--width);
        aspect-ratio: 2 / 1;
        border-radius: var(--radius);
        border: 2px solid var(--clr-grey-500);
        color: var(--clr);
        box-shadow: 0px 4px 10px -6px #4845457a;
        z-index: 4;


        &::before {
            content: '';
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: var(--bg);
            border-radius: var(--radius);
            transform: scaleX(calc(var(--progress, 30) / 100));
            transform-origin: top left;
        }
    }
</style>
