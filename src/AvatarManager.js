"use strict";

/**
 * AvatarManager class representing a manager for avatars.
 */
export default class AvatarManager {
  /**
   * Constructor of the AvatarManager class.
   */
  constructor() {
    this.avatars = [];
  }

  /**
   * Create an avatar to the manager.
   * @param {Object} avatar The avatar object to add.
   */
  createAvatar(avatar) {
    this.avatars.push(avatar);
  }

  /**
   * Read the list of avatars managed by the manager.
   * @returns {Array} The list of avatars.
   */
  readAvatars() {
    return this.avatars;
  }

  /**
   * Update an avatar's data.
   * @param {string} id The ID of the avatar to update.
   * @param {Object} newData The new data to update the avatar with.
   */
  updateAvatar(id, newData) {
    let avatar = this.avatars.find((avatar) => avatar.id === id);
    if (avatar) {
      avatar = newData;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove an avatar from the manager.
   * @param {string} id The ID of the avatar to remove.
   */
  removeAvatar(id) {
    this.avatars = this.avatars.filter((avatar) => avatar.id !== id);
  }

  /**
   * Upgrade an avatar's data with new properties.
   * @param {string} id The ID of the avatar to upgrade.
   * @param {Object} upgradeData The new properties to add or update.
   * @returns {boolean} True if the upgrade was successful, false otherwise.
   */
  upgradeAvatar(id, newUpgradeData) {
    let avatar = this.avatars.find((avatar) => avatar.id === id);
    Object.assign(avatar, newUpgradeData); // Assign new properties to the avatar
  }
}
