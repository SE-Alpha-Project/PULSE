from insert_event_data import cards


def testcards9():
    assert len(cards[0]) > 0


def testcards10():
    assert cards is not None


def testcards11():
    for i in range(len(cards)):
        assert cards[i] is not None


def testcards12():
    assert cards[12]["imageUrl"] is not None


def testcards0():
    for i in range(len(cards)):
        assert len(cards[i]["description"]) > 0


def testcards1():
    assert cards[1]["title"] == "Swimming"


def testcards2():
    assert cards[2]["title"] == "Abs Smash"


def testcards3():
    assert cards[3]["title"] == "Walk Fitness"


def testcards4():
    assert cards[4]["eventTime"] is not None


def testcards5():
    assert len(cards[5]["title"]) > 0


def testcards6():
    assert cards[6]["title"] != "D1ance Fitness"


def testcards7():
    assert len(cards) > 0


def testcards8():
    assert isinstance(cards[0], dict)


def testcards13():
    assert cards[9]["title"] != "Yoga"


def testcards14():
    assert cards[8]["title"] != "Yoga"


def testcards15():
    assert cards[5]["title"] != "Yoga"


def testcards16():
    assert cards[1]["title"] != "Yoga"
