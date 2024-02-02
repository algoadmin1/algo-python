#playsong.py

# https://open.spotify.com/track/3ClcY6tHEy0iwY5BIfm1GG?si=76fbdb5b31c14fc1

import webbrowser

def playSongOnSpotify(song_title):
    """
    Play a specific song on Spotify.

    Parameters:
    - song_title (str): The title of the song.

    Example:
    >>> playSongOnSpotify("Telesto")
    # Opens the Spotify page for the song "Telesto" by DJ Gianni B
    """
    # Assuming a Spotify URL for the song
    spotify_url = f"https://open.spotify.com/search/{song_title.replace(' ', '%20')}"

    # Open the web browser to play the song on Spotify
    webbrowser.open(spotify_url)

# Example usage:
playSongOnSpotify("Telesto")
