<script>
  import Swal from "sweetalert2";
  import { fly } from "svelte/transition";
  import { apiStore } from "./utils/api";
  import { shortlinks, Eror, Success } from "./utils/utils";

  let loading = false;
  let link = "";
  let name = "";
  let temp = shortlinks;
  let theme = document.getElementById("theme");

  function changeTheme() {
    if (theme.dataset.theme == "dark") {
      theme.dataset.theme = "light";
    } else {
      theme.dataset.theme = "dark";
    }
  }

  /**
   * @param {string} name
   * @param {string} links
   */
  function addLink(name, links) {
    shortlinks.push({
      title: name,
      link: links,
    });
    temp = shortlinks;
  }

  /**
   *
   * @param {number} index
   */
  function removeLink(index) {
    temp.splice(index, 1);
    temp = temp;
  }

  /**
   * Store the shortlink
   * @param {string} value
   */
  const storeApi = async (value) => {
    try {
      loading = true;
      const data = await apiStore(value);
      addLink(name, data.result.full_short_link);
      Success("Succesfully added data");
    } catch (error) {
      Eror(error);
    } finally {
      loading = false;
      name = link = "";
    }
  };

  /**
   * Confirm Dialog
   * @param {number} index
   */
  function confirmButton(index) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to see your link, if you delete it",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeLink(index);
        Success("Successfully delete data");
      }
    });
  }

  $: localStorage.setItem("links", JSON.stringify(temp));
</script>

<main class="container">
  <section>
    <!-- Title -->
    <hgroup class="title">
      <h2>Short Url Generator</h2>
      <h3>
        Short Url Generator made with <span class="bold">Svelte</span> and
        <span class="pink"><i class="bi bi-balloon-heart-fill" /></span> by
        <a class="link" href="https://suryamsj.netlify.app/">Muhammad Surya J</a
        >
      </h3>
    </hgroup>

    <!-- Dark or Light Button -->
    <button class="costume_button" on:click={changeTheme}
      ><i class="bi bi-moon" /></button
    >

    <!-- Form -->
    <article>
      <form on:submit|preventDefault={storeApi(link)}>
        <label for="urlname">
          Url Name
          <input
            type="text"
            id="urlname"
            name="urlname"
            placeholder="Your URL Name Here"
            bind:value={name}
            required
          />
        </label>
        <label for="url">
          Your Url
          <input
            type="text"
            id="url"
            name="url"
            placeholder="Your URL Here"
            bind:value={link}
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading ? true : false}>Submit</button
        >
      </form>
    </article>

    <!-- Table -->
    <article>
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Url</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {#each temp as datas, index}
              {#if datas !== null}
                <tr
                  in:fly={{ y: -50, duration: 450, delay: 550 }}
                  out:fly={{ y: -50, duration: 450 }}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{datas.title}</td>
                  <td>
                    <a href={datas.link} target="_blank">{datas.link}</a>
                  </td>
                  <td>
                    <button
                      class="secondary"
                      on:click={() => confirmButton(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              {/if}
            {:else}
              <tr>
                <td colspan="4" class="center">No Data</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </figure>
    </article>
  </section>
</main>

<style>
  main {
    position: relative;
  }

  .title {
    margin-top: 5rem;
  }

  .pink {
    color: #d81b60;
  }

  .bold {
    font-weight: bold;
  }

  .link {
    text-decoration: none;
  }

  th {
    font-weight: bold;
  }

  .center {
    text-align: center;
  }

  .costume_button {
    width: fit-content;
    text-align: right;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
  }

  @media (max-width: 767.98px) {
    .costume_button {
      width: fit-content;
      text-align: right;
      position: absolute;
      top: -50px;
      left: 320px;
      border-radius: 50%;
    }
  }

  @media (max-width: 360.98px) {
    .costume_button {
      width: fit-content;
      text-align: right;
      position: absolute;
      top: -50px;
      left: 290px;
      border-radius: 50%;
    }
  }
</style>
