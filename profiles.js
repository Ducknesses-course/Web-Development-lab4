const message = document.getElementById("message");
const profilesContainer = document.getElementById("profiles");

function displayValue(value, fallback = "Not provided") {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return value;
}

function formatAddress(address = {}) {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "Not provided";
}

async function loadProfiles() {
  try {
    // 1. Fetch the JSON file.
    const response = await fetch("userProfiles.json");

    // fetch() only rejects for network failures. Check HTTP errors explicitly.
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // 2. Parse the response body directly as JSON.
    const profiles = await response.json();

    if (!Array.isArray(profiles) || profiles.length === 0) {
      throw new Error("userProfiles.json must contain a non-empty array.");
    }

    // 3. Render each profile in the page.
    profilesContainer.innerHTML = profiles.map((profile) => {
      const address = profile.address ?? {};
      const preferences = profile.preferences ?? {};

      return `
        <section class="profile">
          <h2>${displayValue(profile.firstName)} ${displayValue(profile.lastName)}</h2>
          <p><b>Email:</b> ${displayValue(profile.email)}</p>
          <p><b>Date of birth:</b> ${displayValue(profile.dateOfBirth)}</p>
          <p><b>Address:</b> ${formatAddress(address)}</p>
          <p><b>Theme:</b> ${displayValue(preferences.theme)}</p>
          <p><b>Language:</b> ${displayValue(preferences.language)}</p>
          <p><b>Notifications:</b> ${preferences.notifications ? "On" : "Off"}</p>
          <p><b>Newsletter:</b> ${preferences.subscription ? "Subscribed" : "Not subscribed"}</p>
        </section>
      `;
    }).join("");

    message.textContent = `Loaded ${profiles.length} profiles from userProfiles.json.`;
    message.className = "success";
  } catch (error) {
    console.error(`Could not load profiles: ${error}`);
    message.textContent = `Could not load profiles: ${error.message}`;
    message.className = "error";
  }
}

loadProfiles();