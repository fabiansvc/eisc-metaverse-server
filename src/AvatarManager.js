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
   * Add an avatar to the manager.
   * @param {Object} avatar The avatar object to add.
   */
  addAvatar(avatar) {
    this.avatars.push(avatar);
  }

  /**
   * Remove an avatar from the manager.
   * @param {string} id The ID of the avatar to remove.
   */
  removeAvatar(id) {
    this.avatars = this.avatars.filter((avatar) => avatar.id !== id);
  }

  /**
   * Update an avatar's data.
   * @param {string} id The ID of the avatar to update.
   * @param {Object} newData The new data to update the avatar with.
   */
  updateAvatar(id, newData) {
    const avatar = this.avatars.find((avatar) => avatar.id === id);
    avatar ? Object.assign(avatar, newData) : console.log("Avatar not found!");
  }

  /**
   * Get the list of avatars managed by the manager.
   * @returns {Array} The list of avatars.
   */
  getAvatars() {
    return this.avatars;
  }
}
