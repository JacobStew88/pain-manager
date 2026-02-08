
window.addEventListener('DOMContentLoaded', () => {

  // ==== Create Player Popup ====
  const popupCreate = document.getElementById('create_player_popup');
  const openCreate = document.getElementById('open_create_player_popup');
  const closeCreate = document.getElementById('close_create_player_popup');

  if (openCreate && closeCreate && popupCreate) {
    openCreate.onclick = () => popupCreate.style.display = 'flex';
    closeCreate.onclick = (e) => {
      e.preventDefault();
      popupCreate.style.display = 'none';
    };
    window.addEventListener('click', (e) => {
      if (e.target === popupCreate) popupCreate.style.display = 'none';
    });
  }

  // ==== Edit Player Popup ====
  const popupEdit = document.getElementById('edit_player_popup');
  const closeEdit = document.getElementById('close_edit_player_popup');

  if (popupEdit && closeEdit) {
    document.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.playerId;
        const name = button.dataset.name;
        const playerClass = button.dataset.class;
        const role = button.dataset.role;

        document.getElementById('edit_player_id').value = id;
        document.getElementById('edit_player_name').value = name;
        document.getElementById('edit_player_class').value = playerClass;
        document.getElementById('edit_player_role').value = role;

        popupEdit.style.display = 'flex';
      });
    });

    closeEdit.onclick = (e) => {
      e.preventDefault();
      popupEdit.style.display = 'none';
    };

    window.addEventListener('click', (e) => {
      if (e.target === popupEdit) popupEdit.style.display = 'none';
    });
  }

  // ==== Delete Player Popup ====
  const popupDelete = document.getElementById('delete_player_popup');
  const cancelDelete = document.getElementById('cancel_delete_player');
  const message = document.getElementById('delete_player_message');
  const playerIDInput = document.getElementById('delete_player_id');

  if (popupDelete && cancelDelete && message && playerIDInput) {
    document.querySelectorAll('.delete-player-button').forEach(button => {
      button.addEventListener('click', () => {
        const playerID = button.dataset.playerId;
        const playerName = button.dataset.playerName;

        message.textContent = `Are you sure you want to remove ${playerName} from the Players table?`;
        playerIDInput.value = playerID;

        popupDelete.style.display = 'flex';
      });
    });

    cancelDelete.addEventListener('click', (e) => {
      e.preventDefault();
      popupDelete.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === popupDelete) popupDelete.style.display = 'none';
    });
  }


  // ==== Create Completed Raid Popup ====
  const openCreateRaid = document.getElementById('open_create_completed_raid_popup');
  const closeCreateRaid = document.getElementById('close_create_completed_raid_popup');
  const createRaidPopup = document.getElementById('create_completed_raid_popup');

  if (openCreateRaid && closeCreateRaid && createRaidPopup) {
    openCreateRaid.onclick = function() {
      createRaidPopup.style.display = 'block';
    };
    closeCreateRaid.onclick = function() {
      createRaidPopup.style.display = 'none';
    };
    window.addEventListener('click', function(event) {
      if (event.target === createRaidPopup) {
        createRaidPopup.style.display = 'none';
      }
    });
  }

  const createRaidForm = document.getElementById('create_completed_raid_form');

  if (createRaidForm) {
    createRaidForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const raidID = document.getElementById('create_completed_raid_name').value;
      const raidDate = document.getElementById('create_completed_raid_date').value;

      try {
        const response = await fetch('/create-completed-raid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            create_completed_raid_name: raidID,
            create_completed_raid_date: raidDate
          })
        });
        window.location.reload();  // reload to show the new entry

      } catch (err) {
        console.error('Fetch error:', err);
        alert('Error creating completed raid');
      }
    });
  }

  // ==== Edit Completed Raid Popup ====
  const popupEditCompletedRaid = document.getElementById('edit_completed_raid_popup');
  const closeEditCompletedRaid = document.getElementById('close_edit_completed_raid_popup');
  const editCompletedRaidForm = document.getElementById('edit_completed_raid_form');

  if (popupEditCompletedRaid && closeEditCompletedRaid && editCompletedRaidForm) {
    document.querySelectorAll('.edit-completed-raid-button').forEach(button => {
      button.addEventListener('click', () => {
        const raidID = button.dataset.raidid;
        const completedRaidID = button.dataset.completedraidid;
        let rawDate = button.dataset.raiddate;
        let dateOnly = new Date(rawDate).toISOString().split('T')[0];

        document.getElementById('edit_completed_raid_id').value = completedRaidID;
        document.getElementById('edit_completed_raid_name').value = raidID;
        document.getElementById('edit_completed_raid_date').value = dateOnly;

        popupEditCompletedRaid.style.display = 'flex';
      });
    });

    closeEditCompletedRaid.onclick = (e) => {
      e.preventDefault();
      popupEditCompletedRaid.style.display = 'none';
    };

    window.addEventListener('click', (e) => {
      if (e.target === popupEditCompletedRaid) popupEditCompletedRaid.style.display = 'none';
    });

    // ===== Submit Edit Completed Raid Form via AJAX =====
    editCompletedRaidForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const completedRaidID = document.getElementById('edit_completed_raid_id').value;
      const raidID = document.getElementById('edit_completed_raid_name').value;
      const raidDate = document.getElementById('edit_completed_raid_date').value;

      try {
        const response = await fetch('/update-completed-raid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            edit_completed_raid_id: completedRaidID,
            edit_completed_raid_name: raidID,
            edit_completed_raid_date: raidDate
          })
        });
        window.location.reload();  // reload to show the updated entry

      } catch (err) {
        console.error('Fetch error:', err);
        alert('Error updating completed raid.');
      }
    });
  }

  // ==== Create Received Item Popup ====
  const openCreateItem = document.getElementById('open_create_item_popup');
  const closeCreateItem = document.getElementById('close_create_item_popup');
  const createItemPopup = document.getElementById('create_item_popup');

  if (openCreateItem && closeCreateItem && createItemPopup) {
    openCreateItem.onclick = function() {
      createItemPopup.style.display = 'block';
    };
    closeCreateItem.onclick = function() {
      createItemPopup.style.display = 'none';
    };
    window.addEventListener('click', function(event) {
      if (event.target === createItemPopup) {
        createItemPopup.style.display = 'none';
      }
    });
  }

  const createItemForm = document.getElementById('create_item_form');
  if (createItemForm) {
    createItemForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const playerID = document.getElementById('create_item_playerName').value;
      const itemID = document.getElementById('create_item_itemName').value;
      const completedRaidID = document.getElementById('create_item_completedRaidID').value;
      const isOffSpec = document.getElementById('create_item_isOffSpec').checked;
      const notes = document.getElementById('create_item_notes').value;

      try {
        const response = await fetch('/create-received-item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            create_item_playerName: playerID,
            create_item_itemName: itemID,
            create_item_completedRaidID: completedRaidID,
            create_item_isOffSpec: isOffSpec,
            create_item_notes: notes
          })
        });
        window.location.reload();  // reload to show the new entry

      } catch (err) {
        console.error('Fetch error:', err);
        alert('Error creating item');
      }
    });
  }


// ==== Edit Received Item Popup ====
const popupEditItem = document.getElementById('edit_item_popup');
const closeEditItem = document.getElementById('close_edit_item_popup');
const editItemForm = document.getElementById('edit_item_form');

if (popupEditItem && closeEditItem && editItemForm) {
  document.querySelectorAll('.edit-received-button').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const playerID = button.dataset.playerid;
      const itemID = button.dataset.itemid;
      const isOffSpec = button.dataset.isoffspec === "1";
      const notes = button.dataset.notes;
      const completedRaidID = button.dataset.completedraidid;

      document.getElementById('edit_item_id').value = id;
      document.getElementById('edit_item_playerName').value = playerID;
      document.getElementById('edit_item_itemName').value = itemID;
      document.getElementById('edit_item_isOffSpec').checked = isOffSpec;
      document.getElementById('edit_item_notes').value = notes;
      document.getElementById('edit_item_completedRaidID').value = completedRaidID;

      popupEditItem.style.display = 'flex';
    });
  });

  closeEditItem.onclick = (e) => {
    e.preventDefault();
    popupEditItem.style.display = 'none';
  };

  window.addEventListener('click', (e) => {
    if (e.target === popupEditItem) popupEditItem.style.display = 'none';
  });

  // ===== Submit Edit Form via AJAX =====
  editItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const receivedItemID = document.getElementById('edit_item_id').value;
    const playerID = document.getElementById('edit_item_playerName').value;
    const itemID = document.getElementById('edit_item_itemName').value;
    const isOffSpec = document.getElementById('edit_item_isOffSpec').checked;
    const notes = document.getElementById('edit_item_notes').value;
    const completedRaidID = document.getElementById('edit_item_completedRaidID').value;

    try {
      const response = await fetch('/edit-received-item', {
        method: 'POST', // or PUT if you prefer REST style
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receivedItemID,
          completedRaidID,
          playerID,
          itemID,
          isOffSpec,
          notes          
        })
      });
    window.location.reload();  // reload to show the new entry
    
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Error updating item.');
    }
  });
}


  // ==== Delete Received Item Popup ====
  const popupDeleteReceivedItem = document.getElementById('delete_received_item_popup');
  const cancelDeleteReceivedItem = document.getElementById('cancel_delete_received_item');
  const messageReceivedItem = document.getElementById('delete_received_item_message');
  const receivedItemID = document.getElementById('delete_received_item_id');

  if (popupDeleteReceivedItem && cancelDeleteReceivedItem && messageReceivedItem && receivedItemID) {
    document.querySelectorAll('.delete-received-item-button').forEach(button => {
      button.addEventListener('click', () => {
        const receivedItemIDValue = button.dataset.receivedItemId;
        const playerName = button.dataset.playerName;
        const itemName = button.dataset.itemName;

        messageReceivedItem.textContent = `Are you sure you want to remove ${itemName} from ${playerName} in the Loot History?`;
        receivedItemID.value = receivedItemIDValue;

        popupDeleteReceivedItem.style.display = 'flex';
      });
    });

    cancelDeleteReceivedItem.addEventListener('click', (e) => {
      e.preventDefault();
      popupDeleteReceivedItem.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === popupDeleteReceivedItem) popupDeleteReceivedItem.style.display = 'none';
    });
  }


  // === Reset Database Popup ====
  const resetBtn = document.getElementById('reset-db-button');
  const resetPopup = document.getElementById('reset-db-popup');
  const cancelBtn = document.getElementById('cancel-reset-db');

  if (resetBtn && resetPopup && cancelBtn) {
    resetBtn.addEventListener('click', function (e) {
      e.preventDefault(); // prevent jumping to top
      resetPopup.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', function () {
      resetPopup.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
      if (e.target === resetPopup) {
        resetPopup.style.display = 'none';
      }
    });
  }

});

/* ==== Create Participant Popup ==== */
const openCreateParticipant = document.getElementById('open_create_participant_popup');
const closeCreateParticipant = document.getElementById('close_create_participant_popup');
const createParticipantPopup = document.getElementById('create_participant_popup');

if (openCreateParticipant && closeCreateParticipant && createParticipantPopup) {
  openCreateParticipant.onclick = function() {
    createParticipantPopup.style.display = 'block';
  };
  closeCreateParticipant.onclick = function() {
    createParticipantPopup.style.display = 'none';
  };
  window.addEventListener('click', function(event) {
    if (event.target === createParticipantPopup) {
      createParticipantPopup.style.display = 'none';
    }
  });
}

const createParticipantForm = document.getElementById('create_participant_form');
if (createParticipantForm) {
  createParticipantForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const playerID = document.getElementById('create_participant_playerID').value;
    const completedRaidID = document.getElementById('create_participant_completedRaidID').value;

    try {
      const response = await fetch('/create-participant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          create_participant_completedRaidID: completedRaidID,
          create_participant_playerID: playerID
        })
      });
      window.location.reload();  // reload to show the new entry

    } catch (err) {
      console.error('Fetch error:', err);
      alert('Error creating participant');
    }
  });
}

// == Delete Participant Popup ====
const popupDeleteParticipant = document.getElementById('delete_participant_popup');
const cancelDeleteParticipant = document.getElementById('cancel_delete_participant');
const messageParticipant = document.getElementById('delete_participant_message');
const playerID = document.getElementById('delete_participant_playerID');
const completedRaidID = document.getElementById('delete_participant_completedRaidID');

if (popupDeleteParticipant && cancelDeleteParticipant && messageParticipant && playerID && completedRaidID) {
  document.querySelectorAll('.delete-participant-button').forEach(button => {
    button.addEventListener('click', () => {
      const playerIDValue = button.dataset.playerId;
      const completedRaidIDValue = button.dataset.completedRaidId;
      const playerName = button.dataset.playerName;
      const raidName = button.dataset.raidName;

      console.log('playerIDValue:', playerIDValue);
      console.log('completedRaidIDValue:', completedRaidIDValue);

      messageParticipant.textContent = `Are you sure you want to remove ${playerName} from ${raidName} in the Raid Participants table?`;
      playerID.value = playerIDValue;
      completedRaidID.value = completedRaidIDValue;

      popupDeleteParticipant.style.display = 'flex';
    });
  });

  cancelDeleteParticipant.addEventListener('click', (e) => {
    e.preventDefault();
    popupDeleteParticipant.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === popupDeleteParticipant) popupDeleteParticipant.style.display = 'none';
  });
}