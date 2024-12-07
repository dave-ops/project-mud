directory_path = 'C:\\_apps\\Mudlet\\logs'
import os
from collections import Counter

def count_specific_words_in_directory(directory_path, specific_words):
    total_word_counts = Counter()

    for filename in os.listdir(directory_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(directory_path, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                text = file.read().lower()
                
                # Count occurrences of the specific words
                for word in specific_words:
                    total_word_counts[word.lower()] += text.count(word.lower())

    return total_word_counts

# List of specific words to count
specific_words = ['grazes', 'injures', 'wounds', 'hits', 'decimates', 'devastates', 'mauls', 'maims', 'mutilates', 'disembowels', 'demolishes', 'eviscerates', 'annihilates']

# Example usage
word_counts = count_specific_words_in_directory(directory_path, specific_words)

# Print the counts
for word, count in word_counts.items():
    print(f"{word}: {count}")