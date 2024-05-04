"use strict";

/**
 * Represents an Avatar in the application.
 * @class
 */
export default class Avatar {
  /**
   * Creates an instance of Avatar.
   * @constructor
   * @param {Object} params - Avatar parameters.
   * @param {string} params.id - The unique identifier of the avatar.
   * @param {Object} params.position - The position of the avatar.
   * @param {Object} params.rotation - The rotation of the avatar.
   * @param {string} params.email - The email associated with the avatar.
   * @param {string} params.nickname - The nickname of the avatar.
   * @param {string} params.avatarUrl - The URL of the avatar's image.
   */
  constructor(id, position, rotation, email, nickname, avatarUrl) {
    this._id = id;
    this._position = position;
    this._rotation = rotation;
    this._email = email;
    this._nickname = nickname;
    this._avatarUrl = avatarUrl;
  }

  // Getters
  /**
   * Get the unique identifier of the avatar.
   * @returns {string} The unique identifier of the avatar.
   */
  get id() {
    return this._id;
  }

  /**
   * Get the position of the avatar.
   * @returns {Object} The position of the avatar.
   */
  get position() {
    return this._position;
  }

  /**
   * Get the rotation of the avatar.
   * @returns {Object} The rotation of the avatar.
   */
  get rotation() {
    return this._rotation;
  }

  /**
   * Get the email associated with the avatar.
   * @returns {string} The email associated with the avatar.
   */
  get email() {
    return this._email;
  }

  /**
   * Get the nickname of the avatar.
   * @returns {string} The nickname of the avatar.
   */
  get nickname() {
    return this._nickname;
  }

  /**
   * Get the URL of the avatar's image.
   * @returns {string} The URL of the avatar's image.
   */
  get avatarUrl() {
    return this._avatarUrl;
  }

  // Setters
  /**
   * Set the position of the avatar.
   * @param {Object} newPosition - The new position of the avatar.
   */
  set position(newPosition) {
    this._position = newPosition;
  }

  /**
   * Set the rotation of the avatar.
   * @param {Object} newRotation - The new rotation of the avatar.
   */
  set rotation(newRotation) {
    this._rotation = newRotation;
  }

  /**
   * Set the email associated with the avatar.
   * @param {string} newEmail - The new email associated with the avatar.
   */
  set email(newEmail) {
    this._email = newEmail;
  }

  /**
   * Set the nickname of the avatar.
   * @param {string} newNickname - The new nickname of the avatar.
   */
  set nickname(newNickname) {
    this._nickname = newNickname;
  }

  /**
   * Set the URL of the avatar's image.
   * @param {string} newAvatarUrl - The new URL of the avatar's image.
   */
  set avatarUrl(newAvatarUrl) {
    this._avatarUrl = newAvatarUrl;
  }
}
