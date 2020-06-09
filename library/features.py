from ast import literal_eval


def classify_card_type(card):
    """For the given type line return one
    of 6 higher level taxonomy of types:
    - Creature
    - Instant
    - Artifact
    - Enchantment
    - Sorcery
    - Land
    """
    type_line = card["type_line"]
    if type_line.startswith("Instant"):
        return "Instant"
    if type_line.startswith("Sorcery"):
        return "Sorcery"
    if type_line.startswith("Land"):
        return "Land"
    if type_line == "Enchantment":
        return type_line
    if type_line == "Artifact":
        return type_line
    if type_line == "Legendary Artifact":
        return "Artifact"

    if "—" in type_line:

        if "Creature" in type_line:
            return "Creature"
        first, second = type_line.split("—")
        first = first.strip()
        second = second.strip()
        if first == "Legendary":
            return second
        if first == "Artifact":
            return first
        if first == "Basic Land":
            return "Land"
        if first == "Enchantment" and second == "Aura":
            return first
        if first == "Enchantment" and second == "Saga":
            return first

    return "Undefined"


def classify_card_identity(card):
    """Given the card's color identity return
    a human readable equivalent:
    U -> Blue
    W, R -> White|Red
    """
    lst = literal_eval(card["color_identity"])
    identity = "|".join(lst)
    identity = (
        identity.replace("W", "White")
        .replace("B", "Black")
        .replace("U", "Blue")
        .replace("G", "Green")
        .replace("R", "Red")
    )
    return identity if identity else "Colourless"
