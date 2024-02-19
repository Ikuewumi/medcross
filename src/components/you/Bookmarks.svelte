<script lang="ts">
    import { onMount } from "svelte";
    import type { Bookmarked } from "../../composables/db";


    onMount(async () => {
        return updateUI()
    })


    let bookmarked: Bookmarked["value"];



    const updateUI = async () => {
        document.querySelector('strong.bookmarks-loading-screen')?.removeAttribute('hidden');
        
        const db = await window.getDb();
        bookmarked = ((await db.get('settings', 'bookmarked')) ?? {
            id: "bookmarked",
            crosswords: []
        }) as any as Bookmarked["value"];


        

    

 
        




        document.querySelector('strong.bookmarks-loading-screen')?.setAttribute('hidden', 'true');


    }
</script>



<div>

    {#if bookmarked?.crosswords?.length}
        <ul>
        {#each bookmarked.crosswords as bookmark, i (i)}

            <li>
                <div class="card">
                    <a href={bookmark.urlId}><h2>{bookmark.title}</h2></a>
                </div>
            </li>
        
        {/each}
        </ul>
    {/if}




</div>






<style lang="scss">
ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    list-style: none;
    padding: 1rem 1.25rem;


    li {
        display: contents;
    }



    .card {
        padding: 1rem 1.25rem;
        background-color: #edededcc;
        border: 1px solid hsl(var(--shadow-color) / 0.3);
        border-radius: var(--radius);
        box-shadow: 0px 0px 4px -1px hsl( var(--shadow-color) / 0.4 );


        a {
            color: var(--clr-grey-400);
            text-decoration: none;


            &:focus, &:hover {
                text-decoration: 2px underline currentColor;
            }


            h2 {
                letter-spacing: -1.5px;
            }
        }
    }
}
</style>
